using System.Threading.Tasks;

namespace Application.API.Common.Infrastructure.Caching
{
    public interface IWlodzimierzCachingContext
    {
        public Task CreateAsync<TModel>(TModel model, CachingSettings settings);

        public Task CreateAsync<TModel>(TModel model);

        public Task<TModel> GetAsync<TModel>();
    }
}