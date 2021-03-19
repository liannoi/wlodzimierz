using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Storage.API.Storage.Users.Core.Models;
using Domain.API.Entities;
using Domain.API.Notifications.Contacts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Storage.API.Storage.Contacts.Commands.Create
{
    public class CreateCommand : IRequest<int>
    {
        public string? OwnerUserId { get; set; }
        public UserDto OwnerUser { get; set; }
        public string? ContactUserId { get; set; }
        public UserDto ContactUser { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Photo { get; set; }

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

                var presentContact = await CheckIfPresentAsync(entity, cancellationToken);
                if (presentContact != null) return presentContact.ContactId;

                await CreateAsync(entity, cancellationToken);

                return entity.ContactId;
            }

            // Helpers.

            private Contact Restore(CreateCommand command)
            {
                return new()
                {
                    OwnerUserId = command.OwnerUserId ?? command.OwnerUser.UserId,
                    ContactUserId = command.ContactUserId ?? command.ContactUser.UserId,
                    FirstName = command.FirstName,
                    LastName = command.LastName,
                    Email = command.Email,
                    Photo = command.Photo
                };
            }

            private async Task<Contact?> CheckIfPresentAsync(Contact entity, CancellationToken cancellationToken)
            {
                return await _context.Contacts.Where(e =>
                        e.ContactUserId == entity.ContactUserId && e.OwnerUserId == entity.OwnerUserId ||
                        e.OwnerUserId == entity.ContactUserId && e.ContactUserId == entity.OwnerUserId)
                    .FirstOrDefaultAsync(cancellationToken);
            }

            private async Task CreateAsync(Contact entity, CancellationToken cancellationToken)
            {
                await _context.Contacts.AddAsync(entity, cancellationToken);
                Notify(entity);
                await _context.SaveChangesAsync(cancellationToken);
            }

            private void Notify(Contact entity)
            {
                entity.Notifications.Add(new CreatedNotification(entity));
            }
        }
    }
}