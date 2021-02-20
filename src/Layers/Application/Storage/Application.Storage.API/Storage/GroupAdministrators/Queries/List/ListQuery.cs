using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API;
using Application.Paging.API.Common.Models;
using Application.Paging.API.Extensions;
using Application.Storage.API.Common.Exceptions;
using Application.Storage.API.Storage.GroupAdministrators.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;

namespace Application.Storage.API.Storage.GroupAdministrators.Queries.List
{
    public class ListQuery : IRequest<PaginatedList<GroupAdministratorDto>>
    {
        private class Handler : IRequestHandler<ListQuery, PaginatedList<GroupAdministratorDto>>
        {
            private readonly IWlodzimierzCachingContext _cache;
            private readonly IWlodzimierzContext _context;
            private readonly IMapper _mapper;

            public Handler(IWlodzimierzContext context, IWlodzimierzCachingContext cache, IMapper mapper)
            {
                _context = context;
                _cache = cache;
                _mapper = mapper;
            }

            public async Task<PaginatedList<GroupAdministratorDto>> Handle(ListQuery request,
                CancellationToken cancellationToken)
            {
                try
                {
                    return await ReadFromCache(request);
                }
                catch (NotFoundException)
                {
                    return await ReadFromDatabase(request);
                }
            }

            private async Task<PaginatedList<GroupAdministratorDto>> ReadFromDatabase(ListQuery query)
            {
                var administrators = await _context.GroupAdministrators
                    .ProjectTo<GroupAdministratorDto>(_mapper.ConfigurationProvider)
                    .PaginatedListAsync(query.PageNumber, query.PageSize);

                await _cache.CreateAsync(administrators);

                return administrators;
            }

            private async Task<PaginatedList<GroupAdministratorDto>> ReadFromCache(ListQuery query)
            {
                var cache = await _cache.GetAsync<PaginatedList<GroupAdministratorDto>>();
                cache.Restore(query.PageNumber, query.PageSize);

                return cache;
            }
        }

        #region Paging

        public int PageNumber { get; set; } = PagingOptions.PageNumber;
        public int PageSize { get; set; } = PagingOptions.PageSize;

        #endregion
    }
}