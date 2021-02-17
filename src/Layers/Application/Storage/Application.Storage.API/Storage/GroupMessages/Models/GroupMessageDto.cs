using System;
using Application.Storage.API.Core.Mappings.Interfaces;
using Application.Storage.API.Storage.Groups.Models;
using AutoMapper;
using Domain.API.Entities;

namespace Application.Storage.API.Storage.GroupMessages.Models
{
    public class GroupMessageDto : IMapFrom<GroupMessage>
    {
        public int GroupMessageId { get; set; }
        public GroupDto Group { get; set; }
        public string OwnerUserId { get; set; }
        public string Message { get; set; }
        public DateTime Publish { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<GroupMessage, GroupMessageDto>()
                .ForMember(dest => dest.GroupMessageId, opt => opt.MapFrom(s => s.GroupMessageId))
                .ForMember(dest => dest.Group, opt => opt.MapFrom(s => s.Group))
                .ForMember(dest => dest.OwnerUserId, opt => opt.MapFrom(s => s.OwnerUserId))
                .ForMember(dest => dest.Message, opt => opt.MapFrom(s => s.Message))
                .ForMember(dest => dest.Publish, opt => opt.MapFrom(s => s.Publish));
        }
    }
}