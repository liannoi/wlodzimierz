using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Storage.API.Common.Exceptions;
using Application.Storage.API.Storage.Groups.Models;
using Domain.API.Entities;
using MediatR;

namespace Application.Storage.API.Storage.GroupBlacklists.Commands.Update
{
    public class UpdateCommand : IRequest
    {
        public int GroupBlacklistId { get; set; }
        public GroupDto Group { get; set; }
        public string BlockedUserId { get; set; }

        private class Handler : IRequestHandler<UpdateCommand>
        {
            private readonly IWlodzimierzContext _context;

            public Handler(IWlodzimierzContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(UpdateCommand command, CancellationToken cancellationToken)
            {
                var entity = await _context.GroupBlacklists.FindAsync(command.GroupBlacklistId) ??
                             throw new NotFoundException(nameof(GroupBlacklist), command.GroupBlacklistId);

                entity.GroupId = command.Group.GroupId;
                entity.BlockedUserId = command.BlockedUserId;
                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}