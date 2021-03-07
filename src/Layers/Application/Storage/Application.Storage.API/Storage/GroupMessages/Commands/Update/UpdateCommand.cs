using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Storage.API.Common.Exceptions;
using Application.Storage.API.Storage.Groups.Models;
using Domain.API.Entities;
using MediatR;

namespace Application.Storage.API.Storage.GroupMessages.Commands.Update
{
    public class UpdateCommand : IRequest
    {
        public int GroupMessageId { get; set; }
        public GroupDto Group { get; set; }
        public string OwnerUserId { get; set; }
        public string Message { get; set; }
        public DateTime Publish { get; set; }

        private class Handler : IRequestHandler<UpdateCommand>
        {
            private readonly IWlodzimierzContext _context;

            public Handler(IWlodzimierzContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(UpdateCommand command, CancellationToken cancellationToken)
            {
                var entity = await _context.GroupMessages.FindAsync(command.GroupMessageId) ??
                             throw new NotFoundException(nameof(GroupMessage), command.GroupMessageId);

                entity.GroupId = command.Group.GroupId;
                entity.OwnerUserId = command.OwnerUserId;
                entity.Message = command.Message;
                entity.Publish = command.Publish;
                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}