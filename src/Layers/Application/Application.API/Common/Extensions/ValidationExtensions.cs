using System.Collections.Generic;
using System.Linq;
using AutoMapper.Internal;
using FluentValidation.Results;

namespace Application.API.Common.Extensions
{
    public static class ValidationExtensions
    {
        public static IDictionary<string, string[]> ToDictionary(this IEnumerable<ValidationFailure> failures)
        {
            return failures.GroupBy(e => e.PropertyName, e => e.ErrorMessage)
                .ToDictionary(failureGroup => failureGroup.Key, failureGroup => failureGroup.ToArray());
        }

        public static IEnumerable<ValidationFailure> ToFailures(this IEnumerable<string> errors)
        {
            var failures = new List<ValidationFailure>();
            errors.ForAll(e => { failures.Add(new ValidationFailure(string.Empty, e)); });

            return failures;
        }

        public static IDictionary<string, string[]> ToDictionary(this IEnumerable<string> errors)
        {
            return ToDictionary(ToFailures(errors));
        }
    }
}