using System;
using System.Text;
using Application.Infrastructure.Identity.API.Common.Interfaces;
using Application.Infrastructure.Identity.API.Common.Models;
using Application.Storage.API.Storage.Users.Facades;
using Infrastructure.Identity.API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using IdentityOptions = Infrastructure.Identity.API.Options.IdentityOptions;
using JwtBearerOptions = Application.Infrastructure.Identity.API.JwtBearerOptions;
using TestingOptions = Infrastructure.EntityFramework.API.Common.Options.TestingOptions;

namespace Infrastructure.Identity.API
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddIdentityPersistence(this IServiceCollection services,
            IConfiguration configuration)
        {
            var useInMemoryDatabase =
                configuration.GetValue<bool>(TestingOptions.UseInMemoryDatabase);

            if (useInMemoryDatabase)
                services.AddDbContext<WlodzimierzIdentityContext>(options =>
                    options.UseInMemoryDatabase(Options.TestingOptions.InMemoryIdentityDatabase));
            else
                services.AddDbContext<WlodzimierzIdentityContext>(options =>
                    options.UseSqlServer(configuration.GetConnectionString(IdentityOptions.Database),
                        b => b.MigrationsAssembly(typeof(WlodzimierzIdentityContext).Assembly.FullName)));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<WlodzimierzIdentityContext>()
                .AddTokenProvider<DataProtectorTokenProvider<ApplicationUser>>(TokenOptions.DefaultProvider);

            services.AddAuthorization();
            services.AddScoped<IIdentityService, IdentityService>();
            services.AddScoped<IUsersFacade, UsersFacade>();

            return services;
        }

        public static IServiceCollection AddIdentityInfrastructure(this IServiceCollection services,
            IConfiguration configuration)
        {
            var section = configuration.GetSection(IdentityOptions.ConfigurationSection);
            services.Configure<JwtBearerOptions>(section);
            var settings = section.Get<JwtBearerOptions>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = settings.Issuer,
                        ValidAudience = settings.Issuer,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(settings.Secret)),
                        ClockSkew = TimeSpan.Zero
                    };
                });

            return services;
        }
    }
}