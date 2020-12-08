namespace Application.API.Common.Infrastructure.Identity.Interfaces
{
    public interface ICurrentUserService
    {
        public string? UserName { get; }
    }
}