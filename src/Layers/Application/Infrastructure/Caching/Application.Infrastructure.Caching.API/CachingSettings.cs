using System;

namespace Application.Infrastructure.Caching.API
{
    public class CachingSettings
    {
        public TimeSpan? AbsoluteExpireTime { get; set; }
        public TimeSpan? UnusedExpireTime { get; set; }
    }
}