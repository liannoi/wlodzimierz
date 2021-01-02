namespace Application.Infrastructure.Identity.API
{
    public class JwtBearerOptions
    {
        public string Secret { get; set; }
        public string Issuer { get; set; }
    }
}