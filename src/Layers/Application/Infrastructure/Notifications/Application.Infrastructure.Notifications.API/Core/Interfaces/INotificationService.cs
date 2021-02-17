using System.Threading.Tasks;
using Domain.API.Common.Notifications.Abstractions;

namespace Application.Infrastructure.Notifications.API.Core.Interfaces
{
    public interface INotificationService
    {
        public Task Publish(AbstractNotification notification);
    }
}