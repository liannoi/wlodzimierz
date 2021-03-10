using System.Threading.Tasks;
using Application.Paging.API.Common.Models;
using Application.Storage.API.Storage.Contacts.Models;
using Application.Storage.API.Storage.ConversationMessages.Models;
using Application.Storage.API.Storage.Conversations.Models;

namespace Application.Storage.API.Storage.Users.Facades
{
    public interface IUsersFacade
    {
        Task MapAsync(ContactDto contact);

        Task MapAsync(IPaginatedList<ContactDto> list);

        Task MapAsync(ConversationDto conversation);

        Task MapAsync(IPaginatedList<ConversationDto> list);
        
        Task MapAsync(ConversationMessageDto message);

        Task MapAsync(IPaginatedList<ConversationMessageDto> list);
    }
}