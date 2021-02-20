using System.Threading.Tasks;
using Application.Paging.API.Common.Models;
using Application.Storage.API.Storage.ConversationMessages.Models;
using Application.Storage.API.Storage.Conversations.Models;

namespace Application.Storage.API.Storage.Users.Facades
{
    public interface IUsersFacade
    {
        Task MapAsync(IPaginatedList<ConversationMessageDto> list);

        Task MapAsync(IPaginatedList<ConversationDto> list);
    }
}