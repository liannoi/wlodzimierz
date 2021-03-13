using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Caching.API.Interfaces;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API.Common.Models;
using Application.Storage.API.Common.Exceptions;
using Application.Storage.API.Storage.Contacts.Models;
using Domain.API.Entities;
using MediatR;

namespace Application.Storage.API.Storage.Contacts.Commands.Delete
{
    public class DeleteCommand : IRequest
    {
        public int ContactId { get; set; }

        private class Handler : IRequestHandler<DeleteCommand>
        {
            private readonly IWlodzimierzCachingContext _cache;
            private readonly IWlodzimierzContext _context;

            public Handler(IWlodzimierzContext context, IWlodzimierzCachingContext cache)
            {
                _context = context;
                _cache = cache;
            }

            public async Task<Unit> Handle(DeleteCommand command, CancellationToken cancellationToken)
            {
                var entity = await _context.Contacts.FindAsync(command.ContactId) ??
                             throw new NotFoundException(nameof(Contact), command.ContactId);

                _context.Contacts.Remove(entity);
                await NotifyAsync(entity);
                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }

            // Helpers.

            private async Task NotifyAsync(Contact contact)
            {
                await _cache.DeleteAsync<PaginatedList<ContactDto>>(new
                    {contact.OwnerUserId, PageNumber = 1, PageSize = 10});
            }
        }
    }
}