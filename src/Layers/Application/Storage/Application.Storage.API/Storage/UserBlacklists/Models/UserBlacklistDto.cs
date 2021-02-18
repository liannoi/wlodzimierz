using Application.Storage.API.Common.Mappings.Interfaces;
using AutoMapper;
using Domain.API.Entities;

namespace Application.Storage.API.Storage.UserBlacklists.Models
{
    public class UserBlacklistDto : IMapFrom<UserBlacklist>
    {
        public int UserBlacklistId { get; set; }
        public string OwnerUserId { get; set; }
        public string BlockedUserId { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<UserBlacklist, UserBlacklistDto>()
                .ForMember(dest => dest.UserBlacklistId, opt => opt.MapFrom(s => s.UserBlacklistId))
                .ForMember(dest => dest.OwnerUserId, opt => opt.MapFrom(s => s.OwnerUserId))
                .ForMember(dest => dest.BlockedUserId, opt => opt.MapFrom(s => s.BlockedUserId));
        }
    }
}