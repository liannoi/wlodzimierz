namespace Application.Infrastructure.Identity.API.Common.Models
{
    public class Authenticator
    {
        public string SharedKey { get; set; }
        public string AuthenticatorUri { get; set; }
    }
}