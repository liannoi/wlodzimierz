using System.Collections.Generic;
using System.Threading.Tasks;
using Application.API.Common.Infrastructure.Persistence;
using Domain.API.Entities;
using HotChocolate;
using Microsoft.EntityFrameworkCore;

namespace Application.API.Storage.Contacts
{
    public class ContactQueries
    {
        public async Task<IList<Contact>> GetContacts([Service] IWlodzimierzContext context)
        {
            return await context.Contacts.ToListAsync();
        }
    }
}