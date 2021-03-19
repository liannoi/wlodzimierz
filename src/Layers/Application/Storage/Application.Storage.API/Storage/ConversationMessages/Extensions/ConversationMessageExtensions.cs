using System.Threading.Tasks;
using Application.Paging.API.Common.Models;
using Application.Storage.API.Storage.ConversationMessages.Models;
using Application.Storage.API.Storage.Users.Core.Facades;

namespace Application.Storage.API.Storage.ConversationMessages.Extensions
{
    public static class ConversationMessageExtensions
    {
        public static async Task<ConversationMessageDto> MapUsersAsync(this Task<ConversationMessageDto> message,
            IUsersFacade facade)
        {
            var awaitedMessage = await message;
            await facade.MapAsync(awaitedMessage);

            return awaitedMessage;
        }

        public static async Task<PaginatedList<ConversationMessageDto>> MapUsersAsync(
            this Task<PaginatedList<ConversationMessageDto>> list, IUsersFacade facade)
        {
            var awaitedList = await list;
            await facade.MapAsync(awaitedList);

            return awaitedList;
        }
    }
}