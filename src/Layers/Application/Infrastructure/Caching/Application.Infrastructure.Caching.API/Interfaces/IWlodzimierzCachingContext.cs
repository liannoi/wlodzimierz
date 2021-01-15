using System.Threading.Tasks;
using Application.Paging.API.Interfaces;

namespace Application.Infrastructure.Caching.API.Interfaces
{
    public interface IWlodzimierzCachingContext
    {
        public Task CreateAsync<TModel>(TModel model, CachingOptions options);

        public Task CreateAsync<TModel>(TModel model);

        public Task CreateAsync<TList, TModel>(TList list, CachingOptions options) where TList : IPaginatedList<TModel>;

        public Task CreateAsync<TList, TModel>(TList list) where TList : IPaginatedList<TModel>;

        public Task<TModel> GetAsync<TModel>();

        public Task<TList> GetAsync<TList, TModel>() where TList : IPaginatedList<TModel>;
    }
}