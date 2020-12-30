using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Persistence.API.Interfaces;
using Domain.API.Entities;
using MediatR;

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

            public async Task<int> Handle(CreateCommand request, CancellationToken cancellationToken)
            {
                var entity = new Conversation
                {
                    LeftUserId = request.LeftUserId,
                    RightUserId = request.RightUserId
                };

                await _context.Conversations.AddAsync(entity, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);

                return entity.ConversationId;
            }
        }
    }
}