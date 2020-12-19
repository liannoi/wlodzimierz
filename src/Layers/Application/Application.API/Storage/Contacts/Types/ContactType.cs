using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.API.Common.Infrastructure.Persistence;
using Domain.API.Entities;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;

namespace Application.API.Storage.Contacts.Types
{
    public class ContactType : ObjectType<Contact>
    {
        protected override void Configure(IObjectTypeDescriptor<Contact> descriptor)
        {
            descriptor
                .Field(c => c.ContactId)
                .Description("Hello World");
        }

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