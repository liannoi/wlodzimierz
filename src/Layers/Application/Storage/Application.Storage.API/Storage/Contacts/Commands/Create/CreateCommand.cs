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
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string? Photo { get; set; }
        public UserDto OwnerUser { get; set; }

        private class Handler : IRequestHandler<CreateCommand, int>
        {
            private readonly IWlodzimierzContext _context;

            public Handler(IWlodzimierzContext context)
            {
                _context = context;
            }

            public async Task<int> Handle(CreateCommand request, CancellationToken cancellationToken)
            {
                var entity = new Contact
                {
                    OwnerUserId = request.OwnerUser.UserId,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Email = request.Email,
                    Photo = request.Photo
                };

                await _context.Contacts.AddAsync(entity, cancellationToken);
                entity.Notifications.Add(new CreatedNotification(entity));
                await _context.SaveChangesAsync(cancellationToken);

                return entity.ContactId;
            }
        }
    }
}