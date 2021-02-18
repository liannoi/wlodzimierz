using Application.Infrastructure.Identity.API.Common.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Presentation.API.Common.Core.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        public CurrentUserService(IHttpContextAccessor httpContextAccessor, IIdentityService identityService)
        {
            var stream = httpContextAccessor.HttpContext!.Request.Headers["Authorization"];
            if (stream.Count == 0) return;

            UserName = identityService.ReadToken(stream);
        }

        public string? UserName { get; }
    }
}