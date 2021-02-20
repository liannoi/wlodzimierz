using System;

namespace Application.Infrastructure.Identity.API.Common.Attributes
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = true)]
    public class AuthorizeAttribute : Attribute
    {
        public string Roles { get; set; }
    }
}