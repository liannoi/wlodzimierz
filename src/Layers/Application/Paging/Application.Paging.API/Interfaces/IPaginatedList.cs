using System.Collections.Generic;

namespace Application.Paging.API.Interfaces
{
    public interface IPaginatedList<TModel>
    {
        public IList<TModel> Items { get; set; }
        public int PageIndex { get; set; }
        public int TotalPages { get; set; }
        public int TotalCount { get; set; }

        public bool HasPreviousPage => PageIndex > 1;

        public bool HasNextPage => PageIndex < TotalPages;
    }
}