using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API;
using Application.Paging.API.Common.Models;
using Application.Paging.API.Extensions;
using Application.Storage.API.Common.Exceptions;
using Application.Storage.API.Storage.GroupMessages.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;

namespace Application.Storage.API.Storage.GroupMessages.Queries.List
{
    public class ListQuery : IRequest<PaginatedList<GroupMessageDto>>
    {
        private class Handler : IRequestHandler<ListQuery, PaginatedList<GroupMessageDto>>
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

            public async Task<PaginatedList<GroupMessageDto>> Handle(ListQuery request,
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

            private async Task<PaginatedList<GroupMessageDto>> ReadFromDatabase(ListQuery query)
            {
                var messages = await _context.GroupMessages
                    .ProjectTo<GroupMessageDto>(_mapper.ConfigurationProvider)
                    .PaginatedListAsync(query.PageNumber, query.PageSize);

                await _cache.CreateAsync(messages);

                return messages;
            }

            private async Task<PaginatedList<GroupMessageDto>> ReadFromCache(ListQuery query)
            {
                var cache = await _cache.GetAsync<PaginatedList<GroupMessageDto>>();
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