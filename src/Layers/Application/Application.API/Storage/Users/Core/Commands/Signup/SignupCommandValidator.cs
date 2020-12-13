using FluentValidation;

namespace Application.API.Storage.Users.Core.Commands.Signup
{
    public class SignupCommandValidator : AbstractValidator<SignupCommand>
    {
        public SignupCommandValidator()
        {
            RuleFor(e => e.UserName)
                .NotEmpty()
                .MinimumLength(1);
        }
    }
}