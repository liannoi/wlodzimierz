using System;
using System.Text;
using Application.API.Common.Infrastructure.Identity.Interfaces;
using Application.API.Common.Infrastructure.Notifications;
using Application.API.Common.Infrastructure.Persistence;
using Application.API.Storage.Users.Core.Models.Domain;
using Infrastructure.API.Identity;
using Infrastructure.API.Identity.Services;
using Infrastructure.API.Notifications;
using Infrastructure.API.Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.API
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services,
            IConfiguration configuration)
        {
            #region Persistence

            var useInMemoryDatabase = configuration.GetValue<bool>(InfrastructureDefaults.UseInMemoryDatabase);

            if (useInMemoryDatabase)
                services.AddDbContext<WlodzimierzContext>(options =>
                    options.UseInMemoryDatabase(InfrastructureDefaults.MemoryPrimaryDatabase));
            else
                services.AddDbContext<WlodzimierzContext>(options =>
                    options.UseSqlServer(configuration.GetConnectionString(InfrastructureDefaults.PrimaryDatabase)));

            services.AddScoped<IWlodzimierzContext>(provider => provider.GetService<WlodzimierzContext>()!);

            #endregion

            #region Notifications

            services.AddScoped<INotificationService, NotificationService>();

            #endregion

            #region Identity

            if (useInMemoryDatabase)
                services.AddDbContext<WlodzimierzIdentityContext>(options =>
                    options.UseInMemoryDatabase(InfrastructureDefaults.MemoryIdentityDatabase));
            else
                services.AddDbContext<WlodzimierzIdentityContext>(options =>
                    options.UseSqlServer(configuration.GetConnectionString(InfrastructureDefaults.IdentityDatabase),
                        b => b.MigrationsAssembly(typeof(WlodzimierzIdentityContext).Assembly.FullName)));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<WlodzimierzIdentityContext>();

            services.AddAuthorization();
            services.AddScoped<IIdentityService, IdentityService>();

            #endregion

            #region JSON Web Token

            var section = configuration.GetSection(InfrastructureDefaults.JwtSection);
            services.Configure<IdentitySettings>(section);
            var appSettings = section.Get<IdentitySettings>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = appSettings.Issuer,
                        ValidAudience = appSettings.Issuer,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appSettings.Secret)),
                        ClockSkew = TimeSpan.Zero
                    };
                });

            #endregion

            return services;
        }
    }
}