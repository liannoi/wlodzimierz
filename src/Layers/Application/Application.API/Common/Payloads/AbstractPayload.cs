using System.Collections.Generic;
using Application.API.Common.Errors;

namespace Application.API.Common.Payloads
{
    public abstract class AbstractPayload
    {
        protected AbstractPayload(IReadOnlyList<UserError>? errors = null)
        {
            Errors = errors;
        }

        public IReadOnlyList<UserError>? Errors { get; }
    }
}