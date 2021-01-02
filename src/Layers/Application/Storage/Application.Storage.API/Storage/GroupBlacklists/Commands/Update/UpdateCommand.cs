using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Storage.API.Common.Core.Exceptions;
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

            public async Task<Unit> Handle(UpdateCommand request, CancellationToken cancellationToken)
            {
                var entity = await _context.GroupBlacklists.FindAsync(request.GroupBlacklistId) ??
                             throw new NotFoundException(nameof(GroupBlacklist), request.GroupBlacklistId);

                entity.GroupId = request.Group.GroupId;
                entity.BlockedUserId = request.BlockedUserId;
                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}