using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Storage.API.Storage.Groups.Models;
using Domain.API.Entities;
using MediatR;

namespace Application.Storage.API.Storage.GroupAdministrators.Commands.Create
{
    public class CreateCommand : IRequest<int>
    {
        public GroupDto Group { get; set; }
        public string AdministratorUserId { get; set; }

        private class Handler : IRequestHandler<CreateCommand, int>
        {
            private readonly IWlodzimierzContext _context;

            public Handler(IWlodzimierzContext context)
            {
                _context = context;
            }

            public async Task<int> Handle(CreateCommand request, CancellationToken cancellationToken)
            {
                var entity = new GroupAdministrator
                {
                    GroupId = request.Group.GroupId,
                    AdministratorUserId = request.AdministratorUserId
                };

                await _context.GroupAdministrators.AddAsync(entity, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);

                return entity.GroupAdministratorId;
            }
        }
    }
}