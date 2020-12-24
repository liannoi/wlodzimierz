using System;
using System.Collections.Generic;
using Application.Validation.API.Extensions;
using FluentValidation.Results;

namespace Application.Validation.API.Exceptions
{
    [Serializable]
    public class ValidationException : Exception
    {
        public ValidationException() : base("One or more validation failures have occurred.")
        {
            Errors = new Dictionary<string, string[]>();
        }

        public ValidationException(IEnumerable<ValidationFailure> failures) : this()
        {
            Errors = failures.ToDictionary();
        }

        public IDictionary<string, string[]> Errors { get; }
    }
}