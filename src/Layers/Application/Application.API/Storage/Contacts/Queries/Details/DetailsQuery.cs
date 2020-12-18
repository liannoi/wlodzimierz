using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.API.Common.Infrastructure.Persistence;
using Application.API.Storage.Contacts.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.API.Storage.Contacts.Queries.Details
{
    public class DetailsQuery : IRequest<ContactDto>
    {
        public int ContactId { get; set; }

        private class Handler : IRequestHandler<DetailsQuery, ContactDto>
        {
            private readonly IWlodzimierzContext _context;
            private readonly IMapper _mapper;

            public Handler(IWlodzimierzContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<ContactDto> Handle(DetailsQuery request, CancellationToken cancellationToken)
            {
                return await _context.Contacts
                    .Where(x => x.ContactId == request.ContactId)
                    .ProjectTo<ContactDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(cancellationToken);
            }
        }
    }
}