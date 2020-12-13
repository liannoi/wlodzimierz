using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Application.API.Common.Paging.Types
{
    public class PaginatedList<TModel>
    {
        public PaginatedList(int pageIndex, int count, int pageSize, IList<TModel> items)
        {
            PageIndex = pageIndex;
            TotalPages = (int) Math.Ceiling(count / (double) pageSize);
            TotalCount = count;
            Items = items;
        }

        public IList<TModel> Items { get; }
        public int PageIndex { get; }
        public int TotalPages { get; }
        public int TotalCount { get; }

        public bool HasPreviousPage => PageIndex > 1;
        public bool HasNextPage => PageIndex < TotalPages;

        public static async Task<PaginatedList<TModel>> CreateAsync(IQueryable<TModel> source, int pageIndex,
            int pageSize)
        {
            var count = await source.CountAsync();
            var items = await source.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();

            return new PaginatedList<TModel>(pageIndex, count, pageSize, items);
        }
    }
}