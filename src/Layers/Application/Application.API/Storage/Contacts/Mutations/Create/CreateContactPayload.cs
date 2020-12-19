using Domain.API.Entities;

namespace Application.API.Storage.Contacts.Mutations.Create
{
    public class CreateContactPayload
    {
        public CreateContactPayload(Contact contact)
        {
            Contact = contact;
        }

        public Contact Contact { get; set; }
    }
}