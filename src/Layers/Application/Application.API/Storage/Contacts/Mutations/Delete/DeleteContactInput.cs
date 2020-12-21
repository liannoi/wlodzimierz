using Domain.API.Entities;
using HotChocolate.Types.Relay;

namespace Application.API.Storage.Contacts.Mutations.Delete
{
    public record DeleteContactInput([ID(nameof(Contact))] int Id);
}