using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Primitives;

namespace Application.API.Common.Interfaces
{
public interface IIdentityServer<in TUser> where TUser : IdentityUser
{
    public string CreateToken(TUser user);

    public string ReadToken(StringValues header);
}
}