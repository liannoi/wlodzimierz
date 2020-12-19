using System.Collections.Generic;
using Application.API.Common.Errors;
using Application.API.Common.Payloads;
using Domain.API.Entities;

namespace Application.API.Storage.Contacts.Mutations
{
    public abstract class AbstractContactPayload : AbstractPayload
    {
        protected AbstractContactPayload(Contact contact)
        {
        }

        protected AbstractContactPayload(IReadOnlyList<UserError> errors) : base(errors)
        {
        }

        public Contact? Contact { get; }
    }
}