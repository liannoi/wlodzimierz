using System.Threading.Tasks;
using MediatR;

namespace Application.Infrastructure.Notifications.API.Sockets
{
    public interface INotificationSubscriber
    {
        public Task SubscribeAsync(INotification notification);
    }
}