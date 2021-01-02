using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Storage.API.Common.Core.Exceptions;
using Application.Storage.API.Storage.Conversations.Models;
using Domain.API.Entities;
using MediatR;

namespace Application.Storage.API.Storage.ConversationMessages.Commands.Update
{
    public class UpdateCommand : IRequest
    {
        public int ConversationMessageId { get; set; }
        public ConversationDto Conversation { get; set; }
        public string OwnerUserId { get; set; }
        public string Message { get; set; }
        public DateTime Publish { get; set; }

        private class Handler : IRequestHandler<UpdateCommand>
        {
            private readonly IWlodzimierzContext _context;

            public Handler(IWlodzimierzContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(UpdateCommand request, CancellationToken cancellationToken)
            {
                var entity = await _context.ConversationMessages.FindAsync(request.ConversationMessageId) ??
                             throw new NotFoundException(nameof(ConversationMessage), request.ConversationMessageId);

                entity.ConversationId = request.Conversation.ConversationId;
                entity.OwnerUserId = request.OwnerUserId;
                entity.Message = request.Message;
                entity.Publish = request.Publish;
                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}