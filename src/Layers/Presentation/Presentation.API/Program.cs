using System;
using Infrastructure.Identity.API;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Presentation.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateWebHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                try
                {
                    var environment = services.GetRequiredService<IWebHostEnvironment>();
                    if (!environment.IsDevelopment())
                    {
                        host.Run();
                        return;
                    }

                    services.GetRequiredService<WlodzimierzIdentityContext>().Database.Migrate();
                }
                catch (Exception ex)
                {
                    services.GetRequiredService<ILogger<Program>>()
                        .LogError(ex, "Error while executing Program.cs file...");

                    throw;
                }
            }

            host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args)
        {
            return WebHost.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((context, config) =>
                {
                    var env = context.HostingEnvironment;

                    config.AddJsonFile("appsettings.json", false, true)
                        .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true, true)
                        .AddJsonFile("appsettings.Caching.json", false, true)
                        .AddJsonFile("appsettings.Identity.json", false, true)
                        .AddJsonFile("appsettings.Persistence.json", false, true);

                    config.AddEnvironmentVariables();
                })
                .UseStartup<Startup>();
        }
    }
}