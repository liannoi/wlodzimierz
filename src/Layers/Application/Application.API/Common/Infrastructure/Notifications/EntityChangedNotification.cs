using Domain.API.Common.Notifications;
using MediatR;

namespace Application.API.Common.Infrastructure.Notifications
{
    // ReSharper disable once ClassNeverInstantiated.Global
    public class EntityChangedNotification<TDomainEvent> : INotification where TDomainEvent : AbstractNotification
    {
        public EntityChangedNotification(TDomainEvent domainEvent)
        {
            DomainEvent = domainEvent;
        }

        public TDomainEvent DomainEvent { get; }
    }
}