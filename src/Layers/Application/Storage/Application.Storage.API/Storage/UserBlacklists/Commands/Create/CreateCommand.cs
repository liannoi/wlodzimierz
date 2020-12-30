using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Persistence.API.Interfaces;
using Domain.API.Entities;
using MediatR;

namespace Application.Storage.API.Storage.UserBlacklists.Commands.Create
{
    public class CreateCommand : IRequest<int>
    {
        public string OwnerUserId { get; set; }
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
                var entity = new UserBlacklist
                    {OwnerUserId = request.OwnerUserId, BlockedUserId = request.BlockedUserId};

                await _context.UserBlacklists.AddAsync(entity, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);

                return entity.UserBlacklistId;
            }
        }
    }
}