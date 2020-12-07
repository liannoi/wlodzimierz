using System;
using System.Collections.Generic;
using System.Linq;

namespace Application.API.Storage.Identity.Models
{
    public class IdentityResult
    {
        private IdentityResult(bool succeeded, IEnumerable<string> errors)
        {
            Succeeded = succeeded;
            Errors = errors.ToArray();
        }

        public bool Succeeded { get; set; }
        public string[] Errors { get; set; }

        public static IdentityResult Success()
        {
            return new IdentityResult(true, Array.Empty<string>());
        }

        public static IdentityResult Failure(IEnumerable<string> errors)
        {
            return new IdentityResult(false, errors);
        }
    }
}