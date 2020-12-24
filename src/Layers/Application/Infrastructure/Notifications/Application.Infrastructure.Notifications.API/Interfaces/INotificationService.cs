using System.Threading.Tasks;
using Domain.API.Common.Notifications;

namespace Application.Infrastructure.Notifications.API.Interfaces
{
    public interface INotificationService
    {
        public Task Publish(AbstractNotification notification);
    }
}