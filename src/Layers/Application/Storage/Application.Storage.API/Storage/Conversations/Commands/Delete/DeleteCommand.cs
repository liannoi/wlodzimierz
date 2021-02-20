using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Storage.API.Common.Exceptions;
using Domain.API.Entities;
using MediatR;

namespace Application.Storage.API.Storage.Conversations.Commands.Delete
{
    public class DeleteCommand : IRequest
    {
        public int ConversationId { get; set; }

        private class Handler : IRequestHandler<DeleteCommand>
        {
            private readonly IWlodzimierzContext _context;

            public Handler(IWlodzimierzContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(DeleteCommand request, CancellationToken cancellationToken)
            {
                var entity = await _context.Conversations.FindAsync(request.ConversationId) ??
                             throw new NotFoundException(nameof(Conversation), request.ConversationId);

                _context.Conversations.Remove(entity);
                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}