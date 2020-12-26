using System;
using Infrastructure.Persistence.API;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Identity.API.Abstractions
{
    public abstract class AbstractDbContextFactory<TContext> : IDesignTimeDbContextFactory<TContext>
        where TContext : DbContext
    {
        public TContext CreateDbContext(string[] args)
        {
            return Create(IdentityOptions.StartDirectory,
                Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")!);
        }

        protected abstract TContext CreateNewInstance(DbContextOptions<TContext> options);

        private TContext Create(string basePath, string environmentName)
        {
            return Create(new ConfigurationBuilder()
                .SetBasePath(basePath)
                .AddJsonFile("appsettings.json", false, true)
                .AddJsonFile($"appsettings.{environmentName}.json", true, true)
                .AddJsonFile("appsettings.Caching.json", false, true)
                .AddJsonFile("appsettings.Identity.json", false, true)
                .AddJsonFile("appsettings.Persistence.json", false, true)
                .AddEnvironmentVariables()
                .Build()
                .GetConnectionString(PersistenceOptions.PrimaryDatabase));
        }

        private TContext Create(string connectionString)
        {
            if (string.IsNullOrEmpty(connectionString))
                throw new ArgumentException(
                    $"Connection string '{PersistenceOptions.PrimaryDatabase}' is null or empty.",
                    nameof(connectionString));

            Console.WriteLine($"AbstractDbContextFactory.Create(string): Connection string: '{connectionString}'.");

            var optionsBuilder = new DbContextOptionsBuilder<TContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return CreateNewInstance(optionsBuilder.Options);
        }
    }
}