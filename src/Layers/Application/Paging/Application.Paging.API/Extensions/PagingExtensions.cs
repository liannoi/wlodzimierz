using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Paging.API.Factories;
using Application.Paging.API.Interfaces;
using Application.Paging.API.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace Application.Paging.API.Extensions
{
    public static class PagingExtensions
    {
        public static Task<PaginatedList<TDestination>> PaginatedListAsync<TDestination>(
            this IQueryable<TDestination> queryable, int pageNumber, int pageSize)
        {
            return new PaginatedListFactory<TDestination>().CreateAsync(queryable, pageNumber, pageSize);
        }

        public static Task<List<TDestination>> ProjectToListAsync<TDestination>(this IQueryable queryable,
            IConfigurationProvider configuration)
        {
            return queryable.ProjectTo<TDestination>(configuration).ToListAsync();
        }

        public static Task<TDestination> ProjectSingleAsync<TDestination>(this IQueryable queryable,
            IConfigurationProvider configuration)
        {
            return queryable.ProjectTo<TDestination>(configuration).SingleOrDefaultAsync();
        }

        public static void Restore<TModel>(this IPaginatedList<TModel> list, int pageIndex, int pageSize)
        {
            list.PageIndex = pageIndex;
            var count = list.Items.Count;
            list.TotalPages = (int) Math.Ceiling(count / (double) pageSize);
            list.TotalCount = count;
        }
    }
}