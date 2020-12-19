using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.API.Common.Interfaces;
using Application.API.Storage.Contacts.Queries;
using Domain.API.Entities;
using HotChocolate.Resolvers;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;

namespace Application.API.Storage.Contacts
{
    public class ContactType : ObjectType<Contact>
    {
        protected override void Configure(IObjectTypeDescriptor<Contact> descriptor)
        {
            descriptor
                .ImplementsNode()
                .IdField(c => c.ContactId)
                .ResolveNode((context, id) =>
                    context.DataLoader<ContactByIdDataLoader>().LoadAsync(id, context.RequestAborted));

            descriptor
                .Field(c => c.ContactId)
                .Description("Hello World");
        }

        // TODO: We write resolvers only here and not for primitive types...
        // For nested composite types or nested collections only.
        private class ContactResolvers
        {
            public async Task<int> GetIdAsync(Contact contact, IWlodzimierzContext context,
                CancellationToken cancellationToken)
            {
                return (await context.Contacts
                        .Where(c => c.ContactId == contact.ContactId)
                        .SingleOrDefaultAsync(cancellationToken))
                    .ContactId;
            }
        }
    }
}