using System;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Identity.API.Common.Attributes;
using Application.Infrastructure.Identity.API.Common.Exceptions;
using Application.Infrastructure.Identity.API.Common.Interfaces;
using MediatR;

namespace Application.Infrastructure.Identity.API.Behaviours
{
    public class AuthorizationBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
        where TRequest : IRequest<TResponse>
    {
        private readonly ICurrentUserService _currentUserService;
        private readonly IIdentityService _identityService;

        public AuthorizationBehaviour(ICurrentUserService currentUserService, IIdentityService identityService)
        {
            _currentUserService = currentUserService;
            _identityService = identityService;
        }

        public async Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken,
            RequestHandlerDelegate<TResponse> next)
        {
            var authorizeAttributes = request.GetType().GetCustomAttributes<AuthorizeAttribute>().ToList();
            if (!authorizeAttributes.Any()) return await next();

            // Must be authenticated user.
            if (_currentUserService.UserName == null) throw new UnauthorizedAccessException();

            // Role-based authorization
            var authorizeAttributesWithRoles =
                authorizeAttributes.Where(a => !string.IsNullOrWhiteSpace(a.Roles)).ToList();

            if (!authorizeAttributesWithRoles.Any()) return await next();

            foreach (var roles in authorizeAttributesWithRoles.Select(a => a.Roles.Split(',')))
            {
                var authorized = false;
                foreach (var role in roles)
                {
                    var isInRole = await _identityService.IsInRoleAsync(_currentUserService.UserName, role.Trim());
                    if (!isInRole) continue;

                    authorized = true;
                    break;
                }

                // Must be a member of at least one role in roles
                if (!authorized) throw new ForbiddenAccessException();
            }

            // User is authorized / authorization not required.
            return await next();
        }
    }
}