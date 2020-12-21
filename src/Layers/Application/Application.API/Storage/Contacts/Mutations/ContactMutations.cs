using System.Threading;
using System.Threading.Tasks;
using Application.API.Common.Errors;
using Application.API.Common.Interfaces;
using Application.API.Storage.Contacts.Mutations.Create;
using Application.API.Storage.Contacts.Mutations.Delete;
using Domain.API.Entities;
using HotChocolate;
using HotChocolate.Types;

namespace Application.API.Storage.Contacts.Mutations
{
    [ExtendObjectType(Name = "Mutation")]
    public class ContactMutations
    {
        public async Task<CreateContactPayload> CreateContactAsync(CreateContactInput input,
            [Service] IWlodzimierzContext context, CancellationToken cancellationToken)
        {
            var entity = new Contact
            {
                OwnerUserId = input.OwnerUserId,
                FirstName = input.FirstName,
                LastName = input.LastName,
                Email = input.Email,
                Photo = input.Photo
            };

            await context.Contacts.AddAsync(entity, cancellationToken);
            await context.SaveChangesAsync(cancellationToken);

            return new CreateContactPayload(entity);
        }

        public async Task<UpdateContactPayload> UpdateContactAsync(UpdateContactInput input,
            [Service] IWlodzimierzContext context, CancellationToken cancellationToken)
        {
            var entity = await context.Contacts.FindAsync(input.Id);
            if (entity is null)
            {
                return new UpdateContactPayload(new UserError("Contact with id not found.", "CONTACT_NOT_FOUND"));
            }

            if (input.FirstName.HasValue)
            {
                entity.FirstName = input.FirstName;
            }

            if (input.LastName.HasValue)
            {
                entity.LastName = input.LastName;
            }

            if (input.Photo.HasValue)
            {
                entity.Photo = input.Photo;
            }

            if (input.Email.HasValue)
            {
                entity.Email = input.Email;
            }

            await context.SaveChangesAsync(cancellationToken);

            return new UpdateContactPayload(entity);
        }

        public async Task<DeleteContactPayload> DeleteContactAsync(DeleteContactInput input,
            [Service] IWlodzimierzContext context, CancellationToken cancellationToken)
        {
            var entity = await context.Contacts.FindAsync(input.Id);
            context.Remove(entity);
            await context.SaveChangesAsync(cancellationToken);

            return new DeleteContactPayload(entity);
        }
    }
}