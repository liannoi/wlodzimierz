namespace Application.Infrastructure.Identity.API
{
    public class JwtBearerSettings
    {
        public string Secret { get; set; }
        public string Issuer { get; set; }
    }
}