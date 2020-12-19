using System.Threading.Tasks;
using Application.API.Common.Infrastructure.Persistence;
using Application.API.Storage.Contacts.Mutations.Create;
using Domain.API.Entities;
using HotChocolate;

namespace Application.API.Storage.Contacts
{
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