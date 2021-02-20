using System;
using Application.Infrastructure.Notifications.API.Common;
using Domain.API.Common.Notifications.Abstractions;
using MediatR;

namespace Infrastructure.Notifications.API.Common.Extensions
{
    public static class WrapperNotificationExtensions
    {
        public static INotification Wrap(this BaseNotification notification)
        {
            var genericType = typeof(WrapperNotification<>).MakeGenericType(notification.GetType());

            return (Activator.CreateInstance(genericType, notification) as INotification)!;
        }
    }
}