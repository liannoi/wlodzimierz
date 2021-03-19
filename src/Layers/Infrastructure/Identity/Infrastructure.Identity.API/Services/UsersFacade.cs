using System.Threading.Tasks;
using Application.Infrastructure.Identity.API.Common.Interfaces;
using Application.Paging.API.Common.Models;
using Application.Storage.API.Storage.Contacts.Models;
using Application.Storage.API.Storage.ConversationMessages.Models;
using Application.Storage.API.Storage.Conversations.Models;
using Application.Storage.API.Storage.Users.Core.Facades;
using Application.Storage.API.Storage.Users.Core.Models;
using AutoMapper;

namespace Infrastructure.Identity.API.Services
{
    public class UsersFacade : IUsersFacade
    {
        private readonly IIdentityService _identityService;
        private readonly IMapper _mapper;

        public UsersFacade(IMapper mapper, IIdentityService identityService)
        {
            _mapper = mapper;
            _identityService = identityService;
        }

        public async Task MapAsync(ContactDto contact)
        {
            contact.OwnerUser = await MapAsync(contact.OwnerUserId);
            contact.ContactUser = await MapAsync(contact.ContactUserId);
        }

        public async Task MapAsync(IPaginatedList<ContactDto> list)
        {
            var contacts = list.Items;
            foreach (var contact in contacts)
            {
                contact.OwnerUser = await MapAsync(contact.OwnerUserId);
                contact.ContactUser = await MapAsync(contact.ContactUserId);
            }
        }

        public async Task MapAsync(ConversationDto conversation)
        {
            conversation.LeftUser = await MapAsync(conversation.LeftUserId);
            conversation.RightUser = await MapAsync(conversation.RightUserId);
        }

        public async Task MapAsync(IPaginatedList<ConversationDto> list)
        {
            var conversations = list.Items;
            foreach (var conversation in conversations) await MapAsync(conversation);
        }

        public async Task MapAsync(ConversationMessageDto message)
        {
            message.OwnerUser = await MapAsync(message.OwnerUserId);
        }

        public async Task MapAsync(IPaginatedList<ConversationMessageDto> list)
        {
            var messages = list.Items;
            foreach (var conversationMessage in messages)
            {
                conversationMessage.OwnerUser = await MapAsync(conversationMessage.OwnerUserId);
                conversationMessage.Conversation.LeftUser = await MapAsync(conversationMessage.Conversation.LeftUserId);

                conversationMessage.Conversation.RightUser =
                    await MapAsync(conversationMessage.Conversation.RightUserId);
            }
        }

        // Helpers.

        private async Task<UserDto> MapAsync(string userId)
        {
            return _mapper.Map<UserDto>(await _identityService.FindByIdAsync(userId));
        }
    }
}