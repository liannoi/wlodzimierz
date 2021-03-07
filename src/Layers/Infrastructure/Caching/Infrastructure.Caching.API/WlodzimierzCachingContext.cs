using System;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Storage.API.Common.Exceptions;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;

namespace Infrastructure.Caching.API
{
    public class WlodzimierzCachingContext : IWlodzimierzCachingContext
    {
        private readonly IDistributedCache _cache;

        public WlodzimierzCachingContext(IDistributedCache cache)
        {
            _cache = cache;
        }

        public async Task CreateAsync<TModel>(TModel model, dynamic key,
            Application.Infrastructure.Caching.API.CachingOptions options)
        {
            var distributedOptions = Serialize(model, options, out string json);
            await _cache.SetStringAsync(Hash<TModel>(key) as string, json, distributedOptions);
        }

        public async Task CreateAsync<TModel>(TModel model, dynamic key)
        {
            await CreateAsync(model, key,
                new Application.Infrastructure.Caching.API.CachingOptions
                    {AbsoluteExpiration = TimeSpan.FromSeconds(60)});
        }

        public async Task<TModel> GetAsync<TModel>(dynamic key)
        {
            var hash = Hash<TModel>(key) as string;
            var json = await _cache.GetStringAsync(hash) ?? throw new NotFoundException(nameof(TModel), hash);

            return JsonConvert.DeserializeObject<TModel>(json);
        }

        // Helpers.

        private string Hash<TModel>(dynamic key)
        {
            var container = new {Type = typeof(TModel).FullName, Data = key};

            return $"{container.GetHashCode()}_{DateTime.Now:yyyyMMdd_HHmm}";
        }

        private DistributedCacheEntryOptions Serialize<TModel>(TModel model,
            Application.Infrastructure.Caching.API.CachingOptions options, out string json)
        {
            var distributedOptions = new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = options.AbsoluteExpiration,
                SlidingExpiration = options.SlidingExpiration
            };

            json = JsonConvert.SerializeObject(model);

            return distributedOptions;
        }
    }
}