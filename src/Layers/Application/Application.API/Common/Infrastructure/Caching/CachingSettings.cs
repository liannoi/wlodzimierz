using System;

namespace Application.API.Common.Infrastructure.Caching
{
    public struct CachingSettings
    {
        public TimeSpan? AbsoluteExpireTime { get; set; }
        public TimeSpan? UnusedExpireTime { get; set; }
    }
}