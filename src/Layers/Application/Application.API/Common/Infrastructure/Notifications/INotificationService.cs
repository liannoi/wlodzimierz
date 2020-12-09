using System.Threading.Tasks;
using Domain.API.Common.Notifications;

namespace Application.API.Common.Infrastructure.Notifications
{
    public interface INotificationService
    {
        public Task Publish(AbstractNotification notification);
    }
}