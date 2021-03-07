using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Storage.API.Common.Exceptions;
using Domain.API.Entities;
using MediatR;

namespace Application.Storage.API.Storage.GroupAdministrators.Commands.Delete
{
    public class DeleteCommand : IRequest
    {
        public int GroupAdministratorId { get; set; }

        private class Handler : IRequestHandler<DeleteCommand>
        {
            private readonly IWlodzimierzContext _context;

            public Handler(IWlodzimierzContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(DeleteCommand command, CancellationToken cancellationToken)
            {
                var entity = await _context.GroupAdministrators.FindAsync(command.GroupAdministratorId) ??
                             throw new NotFoundException(nameof(GroupAdministrator), command.GroupAdministratorId);

                _context.GroupAdministrators.Remove(entity);
                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}