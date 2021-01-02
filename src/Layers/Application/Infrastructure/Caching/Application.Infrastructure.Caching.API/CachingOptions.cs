using System;

namespace Application.Infrastructure.Caching.API
{
    public class CachingOptions
    {
        public TimeSpan? AbsoluteExpireTime { get; set; }
        public TimeSpan? UnusedExpireTime { get; set; }
    }
}