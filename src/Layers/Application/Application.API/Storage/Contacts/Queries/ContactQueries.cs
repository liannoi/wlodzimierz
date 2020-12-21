using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.API.Common.Interfaces;
using Domain.API.Entities;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using Microsoft.EntityFrameworkCore;

namespace Application.API.Storage.Contacts.Queries
{
    [ExtendObjectType(Name = "Query")]
    public class ContactQueries
    {
        [UsePaging]
        public async Task<IList<Contact>> GetContactsAsync([Service] IWlodzimierzContext context,CancellationToken cancellationToken)
        {
            return await context.Contacts.ToListAsync(cancellationToken);
        }

        public async Task<Contact> GetContactByIdAsync([ID(nameof(Contact))] int id, ContactByIdDataLoader dataLoader, CancellationToken cancellationToken)
        {
            return await dataLoader.LoadAsync(id, cancellationToken);
        }
    }
}