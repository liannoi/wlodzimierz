using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Persistence.API.Interfaces;
using Domain.API.Entities;
using Domain.API.Notifications.Conversations;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Storage.API.Storage.Conversations.Commands.Create
{
    public class CreateCommand : IRequest<int>
    {
        public string LeftUserId { get; set; }
        public string RightUserId { get; set; }

        private class Handler : IRequestHandler<CreateCommand, int>
        {
            private readonly IWlodzimierzContext _context;

            public Handler(IWlodzimierzContext context)
            {
                _context = context;
            }

            public async Task<int> Handle(CreateCommand command, CancellationToken cancellationToken)
            {
                var entity = Restore(command);

                var presentConversation = await CheckIfPresentAsync(command, cancellationToken);
                if (presentConversation != null) return presentConversation.ConversationId;

                await CreateAsync(entity, cancellationToken);

                return entity.ConversationId;
            }

            // Helpers.

            private Conversation Restore(CreateCommand command)
            {
                return new() {LeftUserId = command.LeftUserId, RightUserId = command.RightUserId};
            }

            private async Task<Conversation?> CheckIfPresentAsync(CreateCommand command,
                CancellationToken cancellationToken)
            {
                return await _context.Conversations.Where(e =>
                        e.LeftUserId == command.LeftUserId && e.RightUserId == command.RightUserId ||
                        e.LeftUserId == command.RightUserId && e.RightUserId == command.LeftUserId)
                    .FirstOrDefaultAsync(cancellationToken);
            }

            private async Task CreateAsync(Conversation entity, CancellationToken cancellationToken)
            {
                await _context.Conversations.AddAsync(entity, cancellationToken);
                Notify(entity);
                await _context.SaveChangesAsync(cancellationToken);
            }

            private void Notify(Conversation entity)
            {
                entity.Notifications.Add(new CreatedNotification(entity));
            }
        }
    }
}