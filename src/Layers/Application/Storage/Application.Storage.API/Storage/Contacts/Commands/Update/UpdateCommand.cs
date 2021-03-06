using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Storage.API.Common.Exceptions;
using Domain.API.Entities;
using MediatR;

namespace Application.Storage.API.Storage.Contacts.Commands.Update
{
    public class UpdateCommand : IRequest
    {
        public int ContactId { get; set; }
        public string OwnerUserId { get; set; }
        public string ContactUserId { get; set; }
        public string FirstName { get; set; }
        public string? LastName { get; set; }
        public string Email { get; set; }
        public string? Photo { get; set; }

        private class Handler : IRequestHandler<UpdateCommand>
        {
            private readonly IWlodzimierzContext _context;

            public Handler(IWlodzimierzContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(UpdateCommand command, CancellationToken cancellationToken)
            {
                var entity = await _context.Contacts.FindAsync(command.ContactId) ??
                             throw new NotFoundException(nameof(Contact), command.ContactId);

                entity.FirstName = command.FirstName;
                entity.LastName = command.LastName;
                entity.Email = command.Email;
                entity.Photo = command.Photo;
                entity.OwnerUserId = command.OwnerUserId;

                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}