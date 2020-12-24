using System;
using System.Text;
using Application.Infrastructure.Identity.API;
using Application.Infrastructure.Identity.API.Interfaces;
using Application.Infrastructure.Identity.API.Models;
using Infrastructure.Identity.API.Services;
using Infrastructure.Persistence.API;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Identity.API
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddIdentityPersistence(this IServiceCollection services,
            IConfiguration configuration)
        {
            var useInMemoryDatabase = configuration.GetValue<bool>(TestingSettings.UseInMemoryDatabase);

            if (useInMemoryDatabase)
                services.AddDbContext<WlodzimierzIdentityContext>(options =>
                    options.UseInMemoryDatabase(TestingSettings.InMemoryIdentityDatabase));
            else
                services.AddDbContext<WlodzimierzIdentityContext>(options =>
                    options.UseSqlServer(configuration.GetConnectionString(IdentitySettings.IdentityDatabase),
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
            var section = configuration.GetSection(IdentitySettings.JwtSection);
            services.Configure<JwtBearerSettings>(section);
            var settings = section.Get<JwtBearerSettings>();

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