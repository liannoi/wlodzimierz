using System.Collections.Generic;
using Application.API.Common.Errors;
using Domain.API.Entities;

namespace Application.API.Storage.Contacts.Mutations
{
    public class UpdateContactPayload:AbstractContactPayload
    {
        public UpdateContactPayload(Contact contact) : base(contact)
        {
        }

        public UpdateContactPayload(params UserError[] errors) : base(errors)
        {
        }
    }
}