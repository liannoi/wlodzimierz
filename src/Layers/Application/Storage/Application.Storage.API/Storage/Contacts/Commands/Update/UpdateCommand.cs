using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Storage.API.Common.Exceptions;
using Application.Storage.API.Storage.Users.Models;
using Domain.API.Entities;
using MediatR;

namespace Application.Storage.API.Storage.Contacts.Commands.Update
{
    public class UpdateCommand : IRequest
    {
        public int ContactId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Photo { get; set; }
        public UserDto OwnerUser { get; set; }

        private class Handler : IRequestHandler<UpdateCommand>
        {
            private readonly IWlodzimierzContext _context;

            public Handler(IWlodzimierzContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(UpdateCommand request, CancellationToken cancellationToken)
            {
                var entity = await _context.Contacts.FindAsync(request.ContactId) ??
                             throw new NotFoundException(nameof(Contact), request.ContactId);

                entity.FirstName = request.FirstName;
                entity.LastName = request.LastName;
                entity.Email = request.Email;
                entity.Photo = request.Photo;
                entity.OwnerUserId = request.OwnerUser.UserId;
                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}