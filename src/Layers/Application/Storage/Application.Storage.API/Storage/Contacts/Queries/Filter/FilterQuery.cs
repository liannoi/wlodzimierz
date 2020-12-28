using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Filtration.API.Extensions;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API;
using Application.Paging.API.Extensions;
using Application.Paging.API.Models;
using Application.Storage.API.Storage.Contacts.Models;
using Application.Storage.API.Storage.Users.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;

namespace Application.Storage.API.Storage.Contacts.Queries.Filter
{
    public class FilterQuery : IRequest<PaginatedList<ContactDto>>
    {
        public UserDto OwnerUser { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }

        private class Handler : IRequestHandler<FilterQuery, PaginatedList<ContactDto>>
        {
            private readonly IWlodzimierzContext _context;
            private readonly IMapper _mapper;

            public Handler(IWlodzimierzContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<PaginatedList<ContactDto>> Handle(FilterQuery request,
                CancellationToken cancellationToken)
            {
                var model = new ContactDto
                {
                    OwnerUser = request.OwnerUser,
                    FirstName = request.FirstName ?? string.Empty,
                    LastName = request.LastName ?? string.Empty,
                    Email = request.Email ?? string.Empty
                };

                return await _context.Contacts
                    .Where(e => e.OwnerUserId == request.OwnerUser.UserId)
                    .OrderBy(e => e.LastName)
                    .ProjectTo<ContactDto>(_mapper.ConfigurationProvider)
                    .Where(await model.FilterAsync())
                    .PaginatedListAsync(request.PageNumber, request.PageSize);
            }
        }

        #region Paging

        public int PageNumber { get; set; } = PagingOptions.PageNumber;
        public int PageSize { get; set; } = PagingOptions.PageSize;

        #endregion
    }
}