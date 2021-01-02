using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API.Extensions;
using Application.Storage.API.Common.Core.Exceptions;
using Application.Storage.API.Storage.Contacts.Models;
using AutoMapper;
using MediatR;

namespace Application.Storage.API.Storage.Contacts.Queries.Details
{
    public class DetailsQuery : IRequest<ContactDto>
    {
        public int ContactId { get; set; }

        private class Handler : IRequestHandler<DetailsQuery, ContactDto>
        {
            private readonly IWlodzimierzCachingContext _cache;
            private readonly IWlodzimierzContext _context;
            private readonly IMapper _mapper;

            public Handler(IWlodzimierzCachingContext cache, IWlodzimierzContext context, IMapper mapper)
            {
                _cache = cache;
                _context = context;
                _mapper = mapper;
            }

            public async Task<ContactDto> Handle(DetailsQuery request, CancellationToken cancellationToken)
            {
                try
                {
                    return await ReadFromCache();
                }
                catch (NotFoundException)
                {
                    return await ReadFromDatabase(request);
                }
            }

            // Helpers.

            private async Task<ContactDto> ReadFromDatabase(DetailsQuery query)
            {
                var contact = await _context.Contacts
                    .Where(e => e.ContactId == query.ContactId)
                    .ProjectSingleAsync<ContactDto>(_mapper.ConfigurationProvider);

                await _cache.CreateAsync(contact);

                return contact;
            }

            private async Task<ContactDto> ReadFromCache()
            {
                return await _cache.GetAsync<ContactDto>();
            }
        }
    }
}