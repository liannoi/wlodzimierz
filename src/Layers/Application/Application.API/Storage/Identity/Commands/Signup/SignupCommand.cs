using System.Threading;
using System.Threading.Tasks;
using Application.API.Common.Interfaces;
using Application.API.Storage.Identity.Models;
using MediatR;

namespace Application.API.Storage.Identity.Commands.Signup {
  public class SignupCommand : IRequest<JwtToken> {
    public string UserName {
      get;
      set;
    }
    public string Password {
      get;
      set;
    }

    private class Handler : IRequestHandler<SignupCommand, JwtToken> {
      private readonly IIdentityService _identityService;

      public Handler(IIdentityService identityService) {
        _identityService = identityService;
      }

      public async Task<JwtToken> Handle(SignupCommand request,
                                         CancellationToken cancellationToken) {
        var(result, token) = await _identityService.SignupAsync(
            request.UserName, request.Password);

        return token;
      }
    }
  }
}
