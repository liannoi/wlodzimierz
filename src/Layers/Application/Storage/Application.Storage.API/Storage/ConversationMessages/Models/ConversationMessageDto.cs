using System;
using Application.Storage.API.Core.Mappings.Interfaces;
using Application.Storage.API.Storage.Conversations.Models;
using Application.Storage.API.Storage.Users.Models;
using AutoMapper;
using Domain.API.Entities;

namespace Application.Storage.API.Storage.ConversationMessages.Models
{
    public class ConversationMessageDto : IMapFrom<ConversationMessage>
    {
        public int ConversationMessageId { get; set; }
        public ConversationDto Conversation { get; set; }
        public string OwnerUserId { get; set; }
        public UserDto OwnerUser { get; set; }
        public string Message { get; set; }
        public DateTime Publish { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<ConversationMessage, ConversationMessageDto>()
                .ForMember(dest => dest.ConversationMessageId, opt => opt.MapFrom(s => s.ConversationMessageId))
                .ForMember(dest => dest.Conversation, opt => opt.MapFrom(s => s.Conversation))
                .ForMember(dest => dest.OwnerUserId, opt => opt.MapFrom(s => s.OwnerUserId))
                .ForMember(dest => dest.Message, opt => opt.MapFrom(s => s.Message))
                .ForMember(dest => dest.Publish, opt => opt.MapFrom(s => s.Publish));
        }
    }
}