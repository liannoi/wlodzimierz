using System.Text;
using System.Text.Encodings.Web;
using System.Threading;
using System.Threading.Tasks;
using Application.Infrastructure.Identity.API.Common.Interfaces;
using Application.Storage.API.Storage.Users.Security.Models;
using MediatR;

namespace Application.Storage.API.Storage.Users.Security.Queries
{
    public class SetupQuery : IRequest<Authenticator>
    {
        public string UserId { get; set; }

        private class Handler : IRequestHandler<SetupQuery, Authenticator>
        {
            private readonly IIdentityService _identityService;
            private readonly UrlEncoder _urlEncoder;

            public Handler(IIdentityService identityService, UrlEncoder urlEncoder)
            {
                _identityService = identityService;
                _urlEncoder = urlEncoder;
            }

            public async Task<Authenticator> Handle(SetupQuery query, CancellationToken cancellationToken)
            {
                var user = await _identityService.FindByIdAsync(query.UserId);
                var unformattedKey = await _identityService.GetAuthenticatorKeyAsync(user);
                if (string.IsNullOrEmpty(unformattedKey))
                {
                    await _identityService.ResetAuthenticatorKeyAsync(user);
                    unformattedKey = await _identityService.GetAuthenticatorKeyAsync(user);
                }

                var email = await _identityService.GetEmailAsync(user);

                return new Authenticator
                {
                    SharedKey = FormatKey(unformattedKey),
                    AuthenticatorUri = GenerateQrCodeUri(email, unformattedKey)
                };
            }

            // Helpers.

            private string FormatKey(string unformattedKey)
            {
                var result = new StringBuilder();
                var currentPosition = 0;
                while (currentPosition + 4 < unformattedKey.Length)
                {
                    result.Append(unformattedKey.Substring(currentPosition, 4)).Append(' ');
                    currentPosition += 4;
                }

                if (currentPosition < unformattedKey.Length) result.Append(unformattedKey.Substring(currentPosition));

                return result.ToString().ToLowerInvariant();
            }

            private string GenerateQrCodeUri(string email, string unformattedKey)
            {
                const string authenticatorUriFormat = "otpauth://totp/{0}:{1}?secret={2}&issuer={0}&digits=6";

                return string.Format(authenticatorUriFormat, _urlEncoder.Encode("ASP.NET Core Identity"),
                    _urlEncoder.Encode(email), unformattedKey);
            }
        }
    }
}