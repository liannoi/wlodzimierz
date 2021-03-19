using FluentValidation;

namespace Application.Storage.API.Storage.Users.Core.Commands.SignUp
{
    public class SignUpCommandValidator : AbstractValidator<SignUpCommand>
    {
        public SignUpCommandValidator()
        {
            RuleFor(e => e.UserName)
                .NotEmpty().WithMessage("Username cannot be empty.")
                .Matches(@"^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$").WithMessage(
                    "Username must be more than six and at least twenty characters and comply with security policy.");

            RuleFor(e => e.Email)
                .NotEmpty().WithMessage("Email cannot be empty.")
                .Matches(
                    @"^(([^<>()[\]\\.,;:\s@""]+(\.[^<>()[\]\\.,;:\s@""]+)*)|("".+""))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$")
                .WithMessage("Email must comply with security policy.");

            RuleFor(e => e.Password)
                .NotEmpty().WithMessage("Password cannot be empty.")
                .Matches(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$").WithMessage(
                    "Password must contain at least one uppercase and lowercase letter, as well as one special character.");
        }
    }
}