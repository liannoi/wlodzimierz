using System.Threading.Tasks;
using Application.Paging.API.Common.Models;
using Application.Storage.API.Storage.Conversations.Models;
using Application.Storage.API.Storage.Users.Core.Facades;

namespace Application.Storage.API.Storage.Conversations.Extensions
{
    public static class ConversationsExtensions
    {
        public static async Task<PaginatedList<ConversationDto>> MapUsersAsync(
            this Task<PaginatedList<ConversationDto>> list, IUsersFacade facade)
        {
            var awaitedList = await list;
            await facade.MapAsync(awaitedList);

            return awaitedList;
        }

        public static async Task<ConversationDto> MapUsersAsync(this Task<ConversationDto> conversation,
            IUsersFacade facade)
        {
            var awaitedConversation = await conversation;
            await facade.MapAsync(awaitedConversation);

            return awaitedConversation;
        }
    }
}