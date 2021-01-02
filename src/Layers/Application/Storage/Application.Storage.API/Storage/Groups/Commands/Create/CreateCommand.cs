using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Persistence.API.Interfaces;
using Domain.API.Entities;
using MediatR;

namespace Application.Storage.API.Storage.Groups.Commands.Create
{
    public class CreateCommand : IRequest<int>
    {
        public string Name { get; set; }

        private class Handler : IRequestHandler<CreateCommand, int>
        {
            private readonly IWlodzimierzContext _context;

            public Handler(IWlodzimierzContext context)
            {
                _context = context;
            }

            public async Task<int> Handle(CreateCommand request, CancellationToken cancellationToken)
            {
                var entity = new Group {Name = request.Name};
                await _context.Groups.AddAsync(entity, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);

                return entity.GroupId;
            }
        }
    }
}