using HotChocolate;

namespace Application.API.Storage.Contacts.Mutations.Create
{
    public record CreateContactInput(string OwnerUserId, string FirstName, string LastName, string Email,
        Optional<string?> Photo);
}