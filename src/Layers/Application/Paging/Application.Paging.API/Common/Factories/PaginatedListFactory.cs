using System.Linq;
using System.Threading.Tasks;
using Application.Paging.API.Common.Models;
using Microsoft.EntityFrameworkCore;

namespace Application.Paging.API.Common.Factories
{
    public class PaginatedListFactory<TModel>
    {
        public async Task<PaginatedList<TModel>> CreateAsync(IQueryable<TModel> source, int pageIndex, int pageSize)
        {
            var count = await source.CountAsync();
            var items = await source.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();

            return new PaginatedList<TModel>(pageIndex, count, pageSize, items);
        }
    }
}