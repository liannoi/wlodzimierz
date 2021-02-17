using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Storage.API.Common.Exceptions;
using Domain.API.Entities;
using MediatR;

namespace Application.Storage.API.Storage.UserBlacklists.Commands.Update
{
    public class UpdateCommand : IRequest
    {
        public int UserBlacklistId { get; set; }
        public string OwnerUserId { get; set; }
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
                var entity = await _context.UserBlacklists.FindAsync(request.UserBlacklistId) ??
                             throw new NotFoundException(nameof(UserBlacklist), request.UserBlacklistId);

                entity.OwnerUserId = request.OwnerUserId;
                entity.BlockedUserId = request.BlockedUserId;
                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}