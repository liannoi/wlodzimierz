using Microsoft.Extensions.Primitives;

namespace Application.Infrastructure.Identity.API.Common.Interfaces
{
    public interface IIdentityServer<in TUser>
    {
        public string CreateToken(TUser user);

        public string ReadToken(StringValues header);
    }
}