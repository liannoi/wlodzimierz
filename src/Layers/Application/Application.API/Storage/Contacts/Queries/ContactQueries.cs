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
        public async Task<IList<Contact>> GetContactsAsync([Service] IWlodzimierzContext context)
        {
            return await context.Contacts.ToListAsync();
        }

        public async Task<Contact> GetContactAsync([ID(nameof(Contact))] int id, ContactByIdDataLoader dataLoader,
            CancellationToken cancellationToken)
        {
            return await dataLoader.LoadAsync(id, cancellationToken);
        }
    }
}