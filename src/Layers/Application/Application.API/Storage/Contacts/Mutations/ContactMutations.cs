using System.Threading.Tasks;
using Application.API.Common.Interfaces;
using Application.API.Storage.Contacts.Mutations.Create;
using Domain.API.Entities;
using HotChocolate;
using HotChocolate.Types;

namespace Application.API.Storage.Contacts.Mutations
{
    [ExtendObjectType(Name = "Mutation")]
    public class ContactMutations
    {
        public async Task<CreateContactPayload> CreateContactAsync(CreateContactInput input,
            [Service] IWlodzimierzContext context)
        {
            var entity = new Contact
            {
                OwnerUserId = input.OwnerUserId,
                FirstName = input.FirstName,
                LastName = input.LastName,
                Email = input.Email,
                Photo = input.Photo
            };

            await context.Contacts.AddAsync(entity);
            await context.SaveChangesAsync(default);

            return new CreateContactPayload(entity);
        }
    }
}