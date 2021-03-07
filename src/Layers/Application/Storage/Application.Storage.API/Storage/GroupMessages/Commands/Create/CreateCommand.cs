using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Storage.API.Storage.Groups.Models;
using Domain.API.Entities;
using MediatR;

namespace Application.Storage.API.Storage.GroupMessages.Commands.Create
{
    public class CreateCommand : IRequest<int>
    {
        public GroupDto Group { get; set; }
        public string OwnerUserId { get; set; }
        public string Message { get; set; }
        public DateTime Publish { get; set; }

        private class Handler : IRequestHandler<CreateCommand, int>
        {
            private readonly IWlodzimierzContext _context;

            public Handler(IWlodzimierzContext context)
            {
                _context = context;
            }

            public async Task<int> Handle(CreateCommand command, CancellationToken cancellationToken)
            {
                var entity = new GroupMessage
                {
                    GroupId = command.Group.GroupId,
                    OwnerUserId = command.OwnerUserId,
                    Message = command.Message,
                    Publish = command.Publish
                };

                await _context.GroupMessages.AddAsync(entity, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);
                return entity.GroupMessageId;
            }
        }
    }
}