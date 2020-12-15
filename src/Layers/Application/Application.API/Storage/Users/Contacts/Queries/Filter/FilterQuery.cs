using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.API.Common.Infrastructure.Persistence;
using Application.API.Common.Paging;
using Application.API.Storage.Users.Contacts.Models;
using Application.API.Storage.Users.Core.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;

namespace Application.API.Storage.Users.Contacts.Queries.Filter
{
    public class FilterQuery : IRequest<PaginatedList<ContactDto>>
    {
        public UserDto OwnerUser { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }

        private class Handler : IRequestHandler<FilterQuery, PaginatedList<ContactDto>>
        {
            private readonly IWlodzimierzContext _context;
            private readonly IMapper _mapper;

            public Handler(IWlodzimierzContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public Task<PaginatedList<ContactDto>> Handle(FilterQuery request, CancellationToken cancellationToken)
            {
                var model = new ContactDto
                {
                    OwnerUser = request.OwnerUser,
                    FirstName = request.FirstName ?? string.Empty,
                    LastName = request.LastName ?? string.Empty,
                    Email = request.Email ?? string.Empty
                };

                return _context.Contacts
                    .Where(x => x.OwnerUserId == request.OwnerUser.UserId)
                    .OrderBy(x => x.LastName)
                    .ProjectTo<ContactDto>(_mapper.ConfigurationProvider)
                    .Where(model.Filter())
                    .PaginatedListAsync(request.PageNumber ?? 1, request.PageSize ?? 10);
            }
        }
    }
}