using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Storage.API.Storage.Users.Models;
using Domain.API.Entities;
using Domain.API.Notifications.Contacts;
using MediatR;

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
                var entity = new Contact
                {
                    OwnerUserId = command.OwnerUserId ?? command.OwnerUser.UserId,
                    ContactUserId = command.ContactUserId ?? command.ContactUser.UserId,
                    FirstName = command.FirstName,
                    LastName = command.LastName,
                    Email = command.Email,
                    Photo = command.Photo
                };

                await _context.Contacts.AddAsync(entity, cancellationToken);
                entity.Notifications.Add(new CreatedNotification(entity));
                await _context.SaveChangesAsync(cancellationToken);

                return entity.ContactId;
            }
        }
    }
}