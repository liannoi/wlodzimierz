using Application.Storage.API.Common.Mappings.Interfaces;
using Application.Storage.API.Storage.ConversationMessages.Models;
using Application.Storage.API.Storage.Users.Models;
using AutoMapper;
using Domain.API.Entities;

namespace Application.Storage.API.Storage.Conversations.Models
{
    public class ConversationDto : IMapFrom<Conversation>
    {
        public int ConversationId { get; set; }

        public string LeftUserId { get; set; }
        public UserDto LeftUser { get; set; }

        public string RightUserId { get; set; }
        public UserDto RightUser { get; set; }
        public ConversationMessageDto LastMessage { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Conversation, ConversationDto>()
                .ForMember(dest => dest.ConversationId, opt => opt.MapFrom(s => s.ConversationId))
                .ForMember(dest => dest.LeftUserId, opt => opt.MapFrom(s => s.LeftUserId))
                .ForMember(dest => dest.RightUserId, opt => opt.MapFrom(s => s.RightUserId));
        }
    }
}