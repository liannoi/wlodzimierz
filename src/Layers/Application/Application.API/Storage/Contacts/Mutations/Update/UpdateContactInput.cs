using Domain.API.Entities;
using HotChocolate;
using HotChocolate.Types.Relay;

namespace Application.API.Storage.Contacts.Mutations
{
    public record UpdateContactInput([ID(nameof(Contact))] int Id, Optional<string?> FirstName,
        Optional<string?> LastName, Optional<string?> Email, Optional<string?> Photo);
}