namespace Application.Infrastructure.Identity.API.Interfaces
{
    public interface ICurrentUserService
    {
        public string? UserName { get; }
    }
}