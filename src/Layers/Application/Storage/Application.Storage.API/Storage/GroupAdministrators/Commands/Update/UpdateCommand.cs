using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Storage.API.Common.Exceptions;
using Application.Storage.API.Storage.Groups.Models;
using Domain.API.Entities;
using MediatR;

namespace Application.Storage.API.Storage.GroupAdministrators.Commands.Update
{
    public class UpdateCommand : IRequest
    {
        public int GroupAdministratorId { get; set; }
        public GroupDto Group { get; set; }
        public string AdministratorUserId { get; set; }

        private class Handler : IRequestHandler<UpdateCommand>
        {
            private readonly IWlodzimierzContext _context;

            public Handler(IWlodzimierzContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(UpdateCommand command, CancellationToken cancellationToken)
            {
                var entity = await _context.GroupAdministrators.FindAsync(command.GroupAdministratorId) ??
                             throw new NotFoundException(nameof(GroupAdministrator), command.GroupAdministratorId);

                entity.GroupId = command.Group.GroupId;
                entity.AdministratorUserId = command.AdministratorUserId;
                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}