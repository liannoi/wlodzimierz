using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Storage.API.Storage.Groups.Models;
using Domain.API.Entities;
using MediatR;

namespace Application.Storage.API.Storage.GroupBlacklists.Commands.Create
{
    public class CreateCommand : IRequest<int>
    {
        public GroupDto Group { get; set; }
        public string BlockedUserId { get; set; }

        private class Handler : IRequestHandler<CreateCommand, int>
        {
            private readonly IWlodzimierzContext _context;

            public Handler(IWlodzimierzContext context)
            {
                _context = context;
            }

            public async Task<int> Handle(CreateCommand request, CancellationToken cancellationToken)
            {
                var entity = new GroupBlacklist
                {
                    GroupId = request.Group.GroupId,
                    BlockedUserId = request.BlockedUserId
                };

                await _context.GroupBlacklists.AddAsync(entity, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);

                return entity.GroupBlacklistId;
            }
        }
    }
}