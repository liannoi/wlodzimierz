using System.Linq;
using System.Threading.Tasks;
using Application.Paging.API.Common.Factories;
using Application.Paging.API.Common.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace Application.Paging.API.Extensions
{
    public static class PagingExtensions
    {
        public static Task<PaginatedList<TDestination>> ProjectToPaginatedListAsync<TDestination>(
            this IQueryable<TDestination> queryable, int pageNumber, int pageSize)
        {
            return new PaginatedListFactory<TDestination>().CreateAsync(queryable, pageNumber, pageSize);
        }

        public static Task<TDestination> ProjectToSingleAsync<TDestination>(this IQueryable queryable,
            IConfigurationProvider configuration)
        {
            return ProjectToDestination<TDestination>(queryable, configuration).SingleOrDefaultAsync();
        }

        private static IQueryable<TDestination> ProjectToDestination<TDestination>(IQueryable queryable,
            IConfigurationProvider configuration)
        {
            return queryable.ProjectTo<TDestination>(configuration);
        }
    }
}