using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Storage.API.Common.Exceptions;
using Domain.API.Entities;
using MediatR;

namespace Application.Storage.API.Storage.ConversationMessages.Commands.Delete
{
    public class DeleteCommand : IRequest
    {
        public int ConversationMessageId { get; set; }

        private class Handler : IRequestHandler<DeleteCommand>
        {
            private readonly IWlodzimierzContext _context;

            public Handler(IWlodzimierzContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(DeleteCommand request, CancellationToken cancellationToken)
            {
                var entity = await _context.ConversationMessages.FindAsync(request.ConversationMessageId) ??
                             throw new NotFoundException(nameof(ConversationMessage), request.ConversationMessageId);

                _context.ConversationMessages.Remove(entity);
                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}