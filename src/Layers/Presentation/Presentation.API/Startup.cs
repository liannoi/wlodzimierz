using System.IO;
using System.Linq;
using Application.Infrastructure.Identity.API;
using Application.Infrastructure.Identity.API.Common.Interfaces;
using Application.Storage.API;
using Application.Validation.API;
using FluentValidation.AspNetCore;
using Infrastructure.Caching.API;
using Infrastructure.Identity.API;
using Infrastructure.Notifications.API;
using Infrastructure.Notifications.API.Common.Sockets.Hubs;
using Infrastructure.Persistence.API;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using NSwag;
using NSwag.Generation.Processors.Security;
using Presentation.API.Common.Core.Filters;
using Presentation.API.Common.Core.Services;

namespace Presentation.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment environment)
        {
            Configuration = configuration;
            Environment = environment;
        }

        public IConfiguration Configuration { get; }
        public IWebHostEnvironment Environment { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            #region System

            services.AddIdentityPersistence(Configuration);
            services.AddIdentityInfrastructure(Configuration);
            services.AddNotifications();
            services.AddPersistence(Configuration);
            services.AddCaching(Configuration);

            services.AddIdentityInfrastructureForApplication();
            services.AddValidation();
            services.AddApplication();

            #endregion

            services.AddDatabaseDeveloperPageExceptionFilter();

            services.AddHttpContextAccessor();
            services.AddScoped<ICurrentUserService, CurrentUserService>();

            services.AddHealthChecks().AddDbContextCheck<WlodzimierzContext>();

            services.AddCors();
            services.AddSignalR();
            services.AddControllers(options => options.Filters.Add<ExceptionFilter>())
                .AddFluentValidation();

            services.Configure<ApiBehaviorOptions>(options => options.SuppressModelStateInvalidFilter = true);

            services.AddOpenApiDocument(configure =>
            {
                configure.Title = "WLODZIMIERZ API";
                configure.Description =
                    "Thesis at STEP Computer Academy. A cross-platform messenger consisting of a SPA application in Angular, as well as a native mobile application in Kotlin.";

                configure.AddSecurity("JWT", Enumerable.Empty<string>(), new OpenApiSecurityScheme
                {
                    Type = OpenApiSecuritySchemeType.ApiKey,
                    Name = "Authorization",
                    In = OpenApiSecurityApiKeyLocation.Header,
                    Description = "Type into the textbox: Bearer {your JWT token}."
                });

                configure.OperationProcessors.Add(new AspNetCoreOperationSecurityScopeProcessor("JWT"));
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");

                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHealthChecks("/health");
            app.UseHttpsRedirection();

            app.UseOpenApi();
            app.UseSwaggerUi3(settings =>
            {
                settings.Path = "/api";
                settings.DocumentPath = "/swagger/v1/swagger.json";
            });

            app.UseCors(options => options.WithOrigins("http://localhost:4200")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());

            app.UseDefaultFiles();
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Images")),
                RequestPath = new PathString("/Images")
            });

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute("default", "{controller}/{action=Index}/{id?}");
                endpoints.MapHub<NotificationHub>("/notifications");
            });
        }
    }
}