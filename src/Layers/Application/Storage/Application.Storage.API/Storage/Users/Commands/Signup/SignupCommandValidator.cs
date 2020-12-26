using FluentValidation;

namespace Application.Storage.API.Storage.Users.Commands.Signup
{
    public class SignupCommandValidator : AbstractValidator<SignupCommand>
    {
        public SignupCommandValidator()
        {
            RuleFor(e => e.UserName)
                .NotEmpty().WithMessage("Username cannot be empty.")
                .Matches(@"[A-Za-z0-9]").WithMessage("Username can only contain letters or digits.");

            RuleFor(e => e.Password)
                .NotEmpty().WithMessage("Password cannot be empty.")
                .MinimumLength(6).WithMessage("Password must be at least 6 characters.")
                .Matches(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$").WithMessage(
                    "Password must contain at least one uppercase and lowercase letter, as well as one special character.");
        }
    }
}