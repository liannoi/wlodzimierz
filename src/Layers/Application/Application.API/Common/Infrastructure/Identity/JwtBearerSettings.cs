namespace Application.API.Common.Infrastructure.Identity
{
    public class JwtBearerSettings
    {
        public string Secret { get; set; }
        public string Issuer { get; set; }
    }
}