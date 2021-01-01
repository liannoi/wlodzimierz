using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API;
using Application.Paging.API.Extensions;
using Application.Paging.API.Models;
using Application.Storage.API.Common.Core.Exceptions;
using Application.Storage.API.Storage.GroupBlacklists.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;

namespace Application.Storage.API.Storage.GroupBlacklists.Queries.List
{
    public class ListQuery : IRequest<PaginatedList<GroupBlacklistDto>>
    {
        private class Handler : IRequestHandler<ListQuery, PaginatedList<GroupBlacklistDto>>
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

            public async Task<PaginatedList<GroupBlacklistDto>> Handle(ListQuery request,
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

            private async Task<PaginatedList<GroupBlacklistDto>> ReadFromDatabase(ListQuery query)
            {
                var blacklists = await _context.GroupBlacklists
                    .ProjectTo<GroupBlacklistDto>(_mapper.ConfigurationProvider)
                    .PaginatedListAsync(query.PageNumber, query.PageSize);

                await _cache.CreateAsync(blacklists);

                return blacklists;
            }

            private async Task<PaginatedList<GroupBlacklistDto>> ReadFromCache(ListQuery query)
            {
                var cache = await _cache.GetAsync<PaginatedList<GroupBlacklistDto>>();
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