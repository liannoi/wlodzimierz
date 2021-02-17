using FluentValidation;

namespace Application.Storage.API.Storage.Users.Commands.SignIn
{
    public class SignInCommandValidator : AbstractValidator<SignInCommand>
    {
        public SignInCommandValidator()
        {
            RuleFor(e => e.UserName)
                .NotEmpty().WithMessage("Username cannot be empty.")
                .Matches(@"^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$").WithMessage(
                    "Username must be more than six and at least twenty characters and comply with security policy.");

            RuleFor(e => e.Password)
                .NotEmpty().WithMessage("Password cannot be empty.")
                .Matches(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$").WithMessage(
                    "Password must contain at least one uppercase and lowercase letter, as well as one special character.");
        }
    }
}