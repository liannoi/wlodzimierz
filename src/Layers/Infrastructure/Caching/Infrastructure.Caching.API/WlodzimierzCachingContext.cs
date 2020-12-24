using System;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Core.API.Common.Exceptions;
using Application.Infrastructure.Caching.API;
using Application.Infrastructure.Caching.API.Interfaces;
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

        public async Task CreateAsync<TModel>(TModel model, CachingSettings settings)
        {
            var options = new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = settings.AbsoluteExpireTime,
                SlidingExpiration = settings.UnusedExpireTime
            };

            var json = JsonSerializer.Serialize(model);
            await _cache.SetStringAsync(CacheKey<TModel>(), json, options);
        }

        public async Task CreateAsync<TModel>(TModel model)
        {
            await CreateAsync(model, new CachingSettings {AbsoluteExpireTime = TimeSpan.FromSeconds(60)});
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