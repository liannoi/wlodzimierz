using System;

namespace Application.Infrastructure.Caching.API
{
    public class CachingOptions
    {
        public TimeSpan? AbsoluteExpiration { get; set; }
        public TimeSpan? SlidingExpiration { get; set; }
    }
}