using Application.Storage.API.Common.Mappings.Interfaces;
using Application.Storage.API.Storage.Groups.Models;
using AutoMapper;
using Domain.API.Entities;

namespace Application.Storage.API.Storage.GroupBlacklists.Models
{
    public class GroupBlacklistDto : IMapFrom<GroupBlacklist>
    {
        public int GroupBlacklistId { get; set; }
        public GroupDto Group { get; set; }
        public string BlockedUserId { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<GroupBlacklist, GroupBlacklistDto>()
                .ForMember(dest => dest.GroupBlacklistId, opt => opt.MapFrom(s => s.GroupBlacklistId))
                .ForMember(dest => dest.Group, opt => opt.MapFrom(s => s.Group))
                .ForMember(dest => dest.BlockedUserId, opt => opt.MapFrom(s => s.BlockedUserId));
        }
    }
}