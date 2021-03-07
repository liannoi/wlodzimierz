using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Paging.API.Common.Models;

namespace Application.Infrastructure.Caching.API.Extensions
{
    public static class CachingExtensions
    {
        public static async Task<PaginatedList<TModel>> Cache<TModel>(this Task<PaginatedList<TModel>> list,
            IWlodzimierzCachingContext cache, object key)
        {
            var awaitedList = await list;
            await cache.CreateAsync(awaitedList, key);

            return awaitedList;
        }

        public static async Task<TModel> Cache<TModel>(this Task<TModel> model, IWlodzimierzCachingContext cache,
            object key)
        {
            var awaitedModel = await model;
            await cache.CreateAsync(awaitedModel, key);

            return awaitedModel;
        }
    }
}