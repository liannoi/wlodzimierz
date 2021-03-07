using System.Linq;
using System.Threading.Tasks;
using Application.Infrastructure.Persistence.API.Interfaces;
using Application.Paging.API.Common.Models;
using Application.Paging.API.Extensions;
using Application.Storage.API.Storage.ConversationMessages.Models;
using Application.Storage.API.Storage.Conversations.Models;
using AutoMapper;

namespace Application.Storage.API.Storage.Users.Extensions
{
    public static class ConversationExtensions
    {
        public static async Task<PaginatedList<ConversationDto>> MapLastMessagesAsync(
            this Task<PaginatedList<ConversationDto>> list, IWlodzimierzContext context, IMapper mapper)
        {
            var awaitedList = await list;

            foreach (var conversation in awaitedList.Items)
                conversation.LastMessage = await context.ConversationMessages
                    .Where(e => e.ConversationId == conversation.ConversationId)
                    .OrderByDescending(x => x.Publish)
                    .Take(1)
                    .ProjectToSingleAsync<ConversationMessageDto>(mapper.ConfigurationProvider);

            return awaitedList;
        }
    }
}