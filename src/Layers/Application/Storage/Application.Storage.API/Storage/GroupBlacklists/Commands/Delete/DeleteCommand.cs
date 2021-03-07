using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Storage.API.Common.Exceptions;
using Domain.API.Entities;
using MediatR;

namespace Application.Storage.API.Storage.GroupBlacklists.Commands.Delete
{
    public class DeleteCommand : IRequest
    {
        public int GroupBlacklistId { get; set; }

        private class Handler : IRequestHandler<DeleteCommand>
        {
            private readonly IWlodzimierzContext _context;

            public Handler(IWlodzimierzContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(DeleteCommand command, CancellationToken cancellationToken)
            {
                var entity = await _context.GroupBlacklists.FindAsync(command.GroupBlacklistId) ??
                             throw new NotFoundException(nameof(GroupBlacklist), command.GroupBlacklistId);

                _context.GroupBlacklists.Remove(entity);
                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}