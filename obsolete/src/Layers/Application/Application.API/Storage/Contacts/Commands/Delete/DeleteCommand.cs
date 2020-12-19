using System.Threading;
using System.Threading.Tasks;
using Application.API.Common.Core.Exceptions;
using Application.API.Common.Infrastructure.Persistence;
using MediatR;

namespace Application.API.Storage.Contacts.Commands.Delete
{
    public class DeleteCommand : IRequest
    {
        public int ContactId { get; set; }

        private class Handler : IRequestHandler<DeleteCommand>
        {
            private readonly IWlodzimierzContext _context;

            public Handler(IWlodzimierzContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(DeleteCommand request, CancellationToken cancellationToken)
            {
                var entity = await _context.Contacts.FindAsync(request.ContactId) ??
                             throw new NotFoundException(nameof(Contacts), request.ContactId);

                // _context.Contacts.Remove(entity);
                entity.IsRemoved = true;
                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}