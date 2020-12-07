using System;

namespace Application.API.Common.Security
{
[AttributeUsage(AttributeTargets.Class, AllowMultiple = true)]
public class AuthorizeAttribute : Attribute
{
    public string Roles {
        get;
        set;
    }
}
}