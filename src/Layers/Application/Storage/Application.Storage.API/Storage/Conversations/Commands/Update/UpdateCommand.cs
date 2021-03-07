using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Storage.API.Common.Exceptions;
using Domain.API.Entities;
using MediatR;

namespace Application.Storage.API.Storage.Conversations.Commands.Update
{
    public class UpdateCommand : IRequest
    {
        public int ConversationId { get; set; }
        public string LeftUserId { get; set; }
        public string RightUserId { get; set; }

        private class Handler : IRequestHandler<UpdateCommand>
        {
            private readonly IWlodzimierzContext _context;

            public Handler(IWlodzimierzContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(UpdateCommand command, CancellationToken cancellationToken)
            {
                var entity = await _context.Conversations.FindAsync(command.ConversationId) ??
                             throw new NotFoundException(nameof(Conversation), command.ConversationId);

                entity.LeftUserId = command.LeftUserId;
                entity.RightUserId = command.RightUserId;
                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}