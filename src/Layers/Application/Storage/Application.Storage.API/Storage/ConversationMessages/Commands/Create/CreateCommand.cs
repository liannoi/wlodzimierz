using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Storage.API.Storage.Conversations.Models;
using Domain.API.Entities;
using MediatR;

namespace Application.Storage.API.Storage.ConversationMessages.Commands.Create
{
    public class CreateCommand : IRequest<int>
    {
        public ConversationDto Conversation { get; set; }
        public string OwnerUserId { get; set; }
        public string Message { get; set; }
        public DateTime Publish { get; set; }

        private class Handler : IRequestHandler<CreateCommand, int>
        {
            private readonly IWlodzimierzContext _context;

            public Handler(IWlodzimierzContext context)
            {
                _context = context;
            }

            public async Task<int> Handle(CreateCommand request, CancellationToken cancellationToken)
            {
                var entity = new ConversationMessage
                {
                    ConversationId = request.Conversation.ConversationId,
                    OwnerUserId = request.OwnerUserId,
                    Message = request.Message,
                    Publish = request.Publish
                };

                await _context.ConversationMessages.AddAsync(entity, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);

                return entity.ConversationMessageId;
            }
        }
    }
}