using System;
using Application.Infrastructure.Notifications.API.Core.Wrappers;
using Domain.API.Common.Notifications.Abstractions;
using MediatR;

namespace Infrastructure.Notifications.API.Core.Wrappers
{
    public static class NotificationWrapper
    {
        public static INotification Wrap(this AbstractNotification notification)
        {
            var genericType = typeof(WrapperNotification<>).MakeGenericType(notification.GetType());

            return (Activator.CreateInstance(genericType, notification) as INotification)!;
        }
    }
}