using System.Collections.Generic;
using Application.API.Common.Errors;
using Domain.API.Entities;

namespace Application.API.Storage.Contacts.Mutations.Delete
{
    public class DeleteContactPayload:AbstractContactPayload
    {
        public DeleteContactPayload(Contact contact) : base(contact)
        {
        }

        public DeleteContactPayload(IReadOnlyList<UserError> errors) : base(errors)
        {
        }
    }
}