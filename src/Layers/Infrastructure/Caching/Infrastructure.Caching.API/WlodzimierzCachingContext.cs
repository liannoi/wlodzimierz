using System;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Storage.API.Common.Exceptions;
using Microsoft.Extensions.Caching.Distributed;

namespace Infrastructure.Caching.API
{
    public class WlodzimierzCachingContext : IWlodzimierzCachingContext
    {
        private readonly IDistributedCache _cache;

        public WlodzimierzCachingContext(IDistributedCache cache)
        {
            _cache = cache;
        }

        public async Task CreateAsync<TModel>(TModel model,
            Application.Infrastructure.Caching.API.CachingOptions options)
        {
            var distributedOptions = new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = options.AbsoluteExpireTime,
                SlidingExpiration = options.UnusedExpireTime
            };

            var json = JsonSerializer.Serialize(model);
            await _cache.SetStringAsync(CacheKey<TModel>(), json, distributedOptions);
        }

        public async Task CreateAsync<TModel>(TModel model)
        {
            await CreateAsync(model,
                new Application.Infrastructure.Caching.API.CachingOptions
                    {AbsoluteExpireTime = TimeSpan.FromSeconds(60)});
        }

        public async Task<TModel> GetAsync<TModel>()
        {
            var key = CacheKey<TModel>();
            var json = await _cache.GetStringAsync(key) ?? throw new NotFoundException(nameof(TModel), key);

            return JsonSerializer.Deserialize<TModel>(json)!;
        }

        // Helpers.

        private string CacheKey<TModel>()
        {
            return $"{typeof(TModel).Name}_{DateTime.Now:yyyyMMdd_hhmm}";
        }
    }
}