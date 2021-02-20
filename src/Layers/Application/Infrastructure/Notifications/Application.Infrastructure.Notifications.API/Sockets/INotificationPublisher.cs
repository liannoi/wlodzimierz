using System.Threading.Tasks;
using Domain.API.Common.Notifications.Abstractions;

namespace Application.Infrastructure.Notifications.API.Sockets
{
    public interface INotificationPublisher
    {
        public Task PublishAsync(BaseNotification notification);
    }
}