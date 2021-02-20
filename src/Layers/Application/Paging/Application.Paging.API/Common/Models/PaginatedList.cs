using System;
using System.Collections.Generic;

namespace Application.Paging.API.Common.Models
{
    public class PaginatedList<TModel> : IPaginatedList<TModel>
    {
        public PaginatedList(int pageIndex, int count, int pageSize, IList<TModel> items)
        {
            PageIndex = pageIndex;
            TotalPages = (int) Math.Ceiling(count / (double) pageSize);
            TotalCount = count;
            Items = items;
        }

        public PaginatedList()
        {
        }

        public IList<TModel> Items { get; set; }
        public int PageIndex { get; set; }
        public int TotalPages { get; set; }
        public int TotalCount { get; set; }

        public bool HasPreviousPage => PageIndex > 1;

        public bool HasNextPage => PageIndex < TotalPages;
    }
}