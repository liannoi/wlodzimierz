namespace Application.Infrastructure.Identity.API.Common.Interfaces
{
    public interface ICurrentUserService
    {
        public string? UserName { get; }
    }
}