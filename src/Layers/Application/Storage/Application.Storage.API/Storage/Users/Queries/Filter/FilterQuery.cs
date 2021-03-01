using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Filtration.API.Extensions;
using Application.Infrastructure.Identity.API.Common.Interfaces;
using Application.Paging.API;
using Application.Paging.API.Common.Models;
using Application.Paging.API.Extensions;
using Application.Storage.API.Storage.Users.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;

namespace Application.Storage.API.Storage.Users.Queries.Filter
{
    public class FilterQuery : IRequest<PaginatedList<UserDto>>
    {
        public string? UserId { get; set; }
        public string UserName { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }

        private class Handler : IRequestHandler<FilterQuery, PaginatedList<UserDto>>
        {
            private readonly IIdentityService _identityService;
            private readonly IMapper _mapper;

            public Handler(IIdentityService identityService, IMapper mapper)
            {
                _identityService = identityService;
                _mapper = mapper;
            }

            public async Task<PaginatedList<UserDto>> Handle(FilterQuery request, CancellationToken cancellationToken)
            {
                var model = new UserDto
                {
                    UserId = request.UserId ?? string.Empty,
                    UserName = request.UserName,
                    Email = request.Email ?? string.Empty,
                    FirstName = request.FirstName ?? string.Empty,
                    LastName = request.LastName ?? string.Empty
                };

                var users = await _identityService.GetAll()
                    .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
                    .Where(await model.FilterAsync())
                    .PaginatedListAsync(request.PageNumber, request.PageSize);

                return users;
            }
        }

        #region Paging

        public int PageNumber { get; set; } = PagingOptions.PageNumber;
        public int PageSize { get; set; } = PagingOptions.PageSize;

        #endregion
    }
}