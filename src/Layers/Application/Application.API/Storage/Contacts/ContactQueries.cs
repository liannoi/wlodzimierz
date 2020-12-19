using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.API.Common.Infrastructure.Persistence;
using Application.API.Storage.Contacts.DataLoaders;
using Domain.API.Entities;
using HotChocolate;
using Microsoft.EntityFrameworkCore;

namespace Application.API.Storage.Contacts
{
    public class ContactQueries
    {
        public async Task<IList<Contact>> GetContactsAsync([Service] IWlodzimierzContext context)
        {
            return await context.Contacts.ToListAsync();
        }

        public async Task<Contact> GetContactAsync(int id, ContactByIdDataLoader dataLoader,
            CancellationToken cancellationToken)
        {
            return await dataLoader.LoadAsync(id, cancellationToken);
        }
    }
}