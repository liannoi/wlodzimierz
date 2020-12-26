using System;
using System.Text;
using Application.Infrastructure.Identity.API.Interfaces;
using Application.Infrastructure.Identity.API.Models;
using Infrastructure.Identity.API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using JwtBearerOptions = Application.Infrastructure.Identity.API.JwtBearerOptions;

namespace Infrastructure.Identity.API
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddIdentityPersistence(this IServiceCollection services,
            IConfiguration configuration)
        {
            var useInMemoryDatabase =
                configuration.GetValue<bool>(EntityFramework.API.Testing.TestingOptions.UseInMemoryDatabase);

            if (useInMemoryDatabase)
                services.AddDbContext<WlodzimierzIdentityContext>(options =>
                    options.UseInMemoryDatabase(TestingOptions.InMemoryIdentityDatabase));
            else
                services.AddDbContext<WlodzimierzIdentityContext>(options =>
                    options.UseSqlServer(configuration.GetConnectionString(IdentityOptions.Database),
                        b => b.MigrationsAssembly(typeof(WlodzimierzIdentityContext).Assembly.FullName)));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<WlodzimierzIdentityContext>();

            services.AddAuthorization();
            services.AddScoped<IIdentityService, IdentityService>();

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