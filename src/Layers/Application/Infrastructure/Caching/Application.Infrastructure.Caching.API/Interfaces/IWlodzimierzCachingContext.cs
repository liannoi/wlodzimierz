using System.Threading.Tasks;

namespace Application.Infrastructure.Caching.API.Interfaces
{
    public interface IWlodzimierzCachingContext
    {
        public Task CreateAsync<TModel>(TModel model, dynamic key, CachingOptions options);

        public Task CreateAsync<TModel>(TModel model, dynamic key);

        public Task<TModel> GetAsync<TModel>(dynamic key);
    }
}