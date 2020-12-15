using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Application.API.Common.Infrastructure.Identity.Interfaces;
using Application.API.Storage.Users.Core.Models.Domain;
using Infrastructure.API;
using Infrastructure.API.Identity.Extensions;
using Infrastructure.API.Persistence;
using MediatR;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using NUnit.Framework;
using Presentation.API;
using Respawn;

namespace Application.IntegrationTests
{
    [SetUpFixture]
    public class Testing
    {
        private static IConfigurationRoot _configuration;
        private static IServiceScopeFactory _scopeFactory;
        private static Checkpoint _checkpoint;
        private static string _currentUserName;

        [OneTimeSetUp]
        public void RunBeforeAnyTests()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", true, true)
                .AddEnvironmentVariables();

            _configuration = builder.Build();
            var startup = new Startup(_configuration);
            var services = new ServiceCollection();

            services.AddSingleton(Mock.Of<IWebHostEnvironment>(w =>
                w.EnvironmentName == "Development" && w.ApplicationName == "Presentation.API"));

            services.AddLogging();
            startup.ConfigureServices(services);

            // Replace service registration for ICurrentUserService
            // Remove existing registration
            var currentUserServiceDescriptor =
                services.FirstOrDefault(d => d.ServiceType == typeof(ICurrentUserService));

            services.Remove(currentUserServiceDescriptor);

            // Register testing version
            services.AddTransient(_ => Mock.Of<ICurrentUserService>(s => s.UserName == _currentUserName));

            _scopeFactory = services.BuildServiceProvider().GetService<IServiceScopeFactory>();
            _checkpoint = new Checkpoint {TablesToIgnore = new[] {"__EFMigrationsHistory"}};
        }

        [OneTimeTearDown]
        public void RunAfterAnyTests()
        {
        }

        public static async Task<TResponse> SendAsync<TResponse>(IRequest<TResponse> request)
        {
            using var scope = _scopeFactory.CreateScope();
            var mediator = scope.ServiceProvider.GetService<ISender>();

            return await mediator.Send(request);
        }

        public static async Task<string> RunAsDefaultUserAsync()
        {
            return await RunAsUserAsync("test@local", "Testing1234!", Array.Empty<string>());
        }

        public static async Task<string> RunAsAdministratorAsync()
        {
            return await RunAsUserAsync("administrator@local", "Administrator1234!", new[] {"Administrator"});
        }

        public static async Task<string> RunAsUserAsync(string userName, string password, string[] roles)
        {
            using var scope = _scopeFactory.CreateScope();
            var userManager = scope.ServiceProvider.GetService<UserManager<ApplicationUser>>();
            var user = new ApplicationUser {UserName = userName, Email = userName};
            var result = await userManager.CreateAsync(user, password);

            if (roles.Any())
            {
                var roleManager = scope.ServiceProvider.GetService<RoleManager<IdentityRole>>();
                foreach (var role in roles) await roleManager.CreateAsync(new IdentityRole(role));
                await userManager.AddToRolesAsync(user, roles);
            }

            if (result.Succeeded)
            {
                _currentUserName = user.UserName;

                return _currentUserName;
            }

            var errors = string.Join(Environment.NewLine, result.ToApplicationResult().Errors);

            throw new Exception($"Unable to create {userName}.{Environment.NewLine}{errors}");
        }

        public static async Task ResetState()
        {
            await _checkpoint.Reset(_configuration.GetConnectionString(InfrastructureDefaults.PrimaryDatabase));
            _currentUserName = null;
        }

        public static async Task<TEntity> FindAsync<TEntity>(params object[] keyValues) where TEntity : class
        {
            using var scope = _scopeFactory.CreateScope();
            
            return await scope.ServiceProvider.GetService<WlodzimierzContext>().FindAsync<TEntity>(keyValues);
        }

        public static async Task AddAsync<TEntity>(TEntity entity) where TEntity : class
        {
            using var scope = _scopeFactory.CreateScope();
            var context = scope.ServiceProvider.GetService<WlodzimierzContext>();
            await context.AddAsync(entity);
            await context.SaveChangesAsync();
        }

        public static async Task<int> CountAsync<TEntity>() where TEntity : class
        {
            using var scope = _scopeFactory.CreateScope();
            
            return await scope.ServiceProvider.GetService<WlodzimierzContext>().Set<TEntity>().CountAsync();
        }
    }
}