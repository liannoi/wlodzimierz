using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Storage.API.Common.Core.Exceptions;
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

            public async Task<Unit> Handle(UpdateCommand request, CancellationToken cancellationToken)
            {
                var entity = await _context.GroupAdministrators.FindAsync(request.GroupAdministratorId) ??
                             throw new NotFoundException(nameof(GroupAdministrator), request.GroupAdministratorId);

                entity.GroupId = request.Group.GroupId;
                entity.AdministratorUserId = request.AdministratorUserId;
                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}