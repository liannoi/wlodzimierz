using System.Threading.Tasks;
using Application.Paging.API.Common.Models;
using Application.Storage.API.Storage.ConversationMessages.Models;
using Application.Storage.API.Storage.Conversations.Models;
using Application.Storage.API.Storage.Users.Facades;

namespace Application.Storage.API.Storage.Conversations.Extensions
{
    public static class ConversationsExtensions
    {
        public static async Task<PaginatedList<ConversationMessageDto>> MapUsersAsync(
            this Task<PaginatedList<ConversationMessageDto>> list, IUsersFacade facade)
        {
            var awaitedList = await list;
            await facade.MapAsync(awaitedList);

            return awaitedList;
        }

        public static async Task<PaginatedList<ConversationDto>> MapUsersAsync(
            this Task<PaginatedList<ConversationDto>> list, IUsersFacade facade)
        {
            var awaitedList = await list;
            await facade.MapAsync(awaitedList);

            return awaitedList;
        }
    }
}