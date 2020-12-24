using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using Application.Core.API;
using Application.Infrastructure.Identity.API.Interfaces;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Infrastructure.Identity.API.Behaviours
{
    public class PerformanceBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    {
        private readonly ICurrentUserService _currentUserService;
        private readonly IIdentityService _identityService;
        private readonly ILogger<TRequest> _logger;
        private readonly Stopwatch _timer;

        public PerformanceBehaviour(ILogger<TRequest> logger, ICurrentUserService currentUserService,
            IIdentityService identityService)
        {
            _timer = new Stopwatch();
            _logger = logger;
            _currentUserService = currentUserService;
            _identityService = identityService;
        }

        public async Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken,
            RequestHandlerDelegate<TResponse> next)
        {
            _timer.Start();
            var response = await next();
            _timer.Stop();

            var elapsedMilliseconds = _timer.ElapsedMilliseconds;
            if (elapsedMilliseconds <= 500) return response;

            var userName = _currentUserService.UserName ?? string.Empty;
            var userId = string.Empty;

            if (!string.IsNullOrEmpty(userName)) userId = (await _identityService.FindByNameAsync(userName)).Id;

            _logger.LogWarning(
                $"{ApplicationSettings.ApiTag} Long Running Request: {{Name}} ({{ElapsedMilliseconds}} milliseconds) {{@UserId}} {{@UserName}} {{@Request}}",
                typeof(TRequest).Name, elapsedMilliseconds, userName, userId, request);

            return response;
        }
    }
}