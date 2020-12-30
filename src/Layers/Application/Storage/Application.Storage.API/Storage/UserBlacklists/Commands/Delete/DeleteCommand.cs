using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Storage.API.Common.Core.Exceptions;
using Domain.API.Entities;
using MediatR;

namespace Application.Storage.API.Storage.UserBlacklists.Commands.Delete
{
    public class DeleteCommand : IRequest
    {
        public int UserBlacklistId { get; set; }

        private class Handler : IRequestHandler<DeleteCommand>
        {
            private readonly IWlodzimierzContext _context;

            public Handler(IWlodzimierzContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(DeleteCommand request, CancellationToken cancellationToken)
            {
                var entity = await _context.UserBlacklists.FindAsync(request.UserBlacklistId) ??
                             throw new NotFoundException(nameof(UserBlacklist), request.UserBlacklistId);

                _context.UserBlacklists.Remove(entity);
                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}