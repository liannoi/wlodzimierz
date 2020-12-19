using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.API.Common.Interfaces;
using Domain.API.Entities;
using GreenDonut;
using HotChocolate.DataLoader;
using Microsoft.EntityFrameworkCore;

namespace Application.API.Storage.Contacts.Queries
{
    public class ContactByIdDataLoader : BatchDataLoader<int, Contact>
    {
        private readonly IWlodzimierzContext _context;

        public ContactByIdDataLoader(IWlodzimierzContext context, IBatchScheduler scheduler) : base(scheduler)
        {
            _context = context;
        }

        protected override async Task<IReadOnlyDictionary<int, Contact>> LoadBatchAsync(IReadOnlyList<int> keys,
            CancellationToken cancellationToken)
        {
            return await _context.Contacts
                .Where(c => keys.Contains(c.ContactId))
                .ToDictionaryAsync(t => t.ContactId, cancellationToken);
        }
    }
}