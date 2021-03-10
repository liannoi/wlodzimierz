using System.Threading.Tasks;
using Application.Paging.API.Common.Models;
using Application.Storage.API.Storage.Contacts.Models;
using Application.Storage.API.Storage.Users.Facades;

namespace Application.Storage.API.Storage.Contacts.Extensions
{
    public static class ContactExtensions
    {
        public static async Task<ContactDto> MapUsersAsync(this Task<ContactDto> contact, IUsersFacade facade)
        {
            var awaitedContact = await contact;
            await facade.MapAsync(awaitedContact);

            return awaitedContact;
        }

        public static async Task<PaginatedList<ContactDto>> MapUsersAsync(this Task<PaginatedList<ContactDto>> list,
            IUsersFacade facade)
        {
            var awaitedList = await list;
            await facade.MapAsync(awaitedList);

            return awaitedList;
        }
    }
}