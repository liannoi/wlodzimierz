using System.Threading.Tasks;
using Domain.API.Common.Notifications;

namespace Application.API.Common.Notifications.Interfaces
{
    public interface INotificationService
    {
        public Task Publish(AbstractNotification notification);
    }
}