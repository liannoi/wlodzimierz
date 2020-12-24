using System;
using System.Collections.Generic;
using System.Linq;

namespace Application.Infrastructure.Identity.API.Models
{
    public class IdentityResult
    {
        private IdentityResult(bool succeeded, IEnumerable<string> errors)
        {
            Succeeded = succeeded;
            Errors = errors.ToArray();
        }

        public bool Succeeded { get; }
        public string[] Errors { get; }

        public static IdentityResult Success()
        {
            return new(true, Array.Empty<string>());
        }

        public static IdentityResult Failure(IEnumerable<string> errors)
        {
            return new(false, errors);
        }

        public static IdentityResult Failure()
        {
            return Failure(Array.Empty<string>());
        }
    }
}