using System;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Paging.API.Interfaces;
using Application.Storage.API.Common.Core.Exceptions;
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

        public async Task CreateAsync<TModel>(TModel model,
            Application.Infrastructure.Caching.API.CachingOptions options)
        {
            var distributedOptions = Serialize(model, options, out string json);
            await _cache.SetStringAsync(CacheKey<TModel>(), json, distributedOptions);
        }

        public async Task CreateAsync<TModel>(TModel model)
        {
            await CreateAsync(model, new Application.Infrastructure.Caching.API.CachingOptions
                {AbsoluteExpireTime = TimeSpan.FromSeconds(60)});
        }

        public async Task CreateAsync<TList, TModel>(TList list) where TList : IPaginatedList<TModel>
        {
            await CreateAsync<TList, TModel>(list, new Application.Infrastructure.Caching.API.CachingOptions
                {AbsoluteExpireTime = TimeSpan.FromSeconds(60)});
        }

        public async Task CreateAsync<TList, TModel>(TList list,
            Application.Infrastructure.Caching.API.CachingOptions options) where TList : IPaginatedList<TModel>
        {
            var distributedOptions = Serialize<TList, TModel>(list, options, out string json);
            await _cache.SetStringAsync(CacheListKey<TList, TModel>(), json, distributedOptions);
        }

        public async Task<TModel> GetAsync<TModel>()
        {
            var key = CacheKey<TModel>();
            var json = await _cache.GetStringAsync(key) ?? throw new NotFoundException(nameof(TModel), key);

            return JsonConvert.DeserializeObject<TModel>(json);
        }

        public async Task<TList> GetAsync<TList, TModel>() where TList : IPaginatedList<TModel>
        {
            var key = CacheListKey<TList, TModel>();
            var json = await _cache.GetStringAsync(key) ?? throw new NotFoundException(nameof(TModel), key);

            return JsonConvert.DeserializeObject<TList>(json);
        }

        // Helpers.

        private string CacheKey<TModel>()
        {
            return $"{typeof(TModel).Name}_{DateTime.Now:yyyyMMdd_hhmm}";
        }

        private string CacheListKey<TList, TModel>()
        {
            return $"{nameof(TList)}<{nameof(TModel)}>_{DateTime.Now:yyyyMMdd_hhmm}";
        }

        private DistributedCacheEntryOptions Serialize<TList, TModel>(TList list,
            Application.Infrastructure.Caching.API.CachingOptions options,
            out string json) where TList : IPaginatedList<TModel>
        {
            var distributedOptions = new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = options.AbsoluteExpireTime,
                SlidingExpiration = options.UnusedExpireTime
            };

            json = JsonConvert.SerializeObject(list);

            return distributedOptions;
        }

        private DistributedCacheEntryOptions Serialize<TModel>(TModel model,
            Application.Infrastructure.Caching.API.CachingOptions options, out string json)
        {
            var distributedOptions = new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = options.AbsoluteExpireTime,
                SlidingExpiration = options.UnusedExpireTime
            };

            json = JsonConvert.SerializeObject(model);

            return distributedOptions;
        }
    }
}