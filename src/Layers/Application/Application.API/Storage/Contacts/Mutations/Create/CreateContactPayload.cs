using System.Collections.Generic;
using Application.API.Common.Errors;
using Domain.API.Entities;

namespace Application.API.Storage.Contacts.Mutations.Create
{
    public class CreateContactPayload : AbstractContactPayload
    {
        public CreateContactPayload(Contact contact) : base(contact)
        {
        }

        public CreateContactPayload(params UserError[] errors) : base(errors)
        {
        }
    }
}