using Application.Storage.API.Core.Mappings.Interfaces;
using AutoMapper;
using Domain.API.Entities;

namespace Application.Storage.API.Storage.Groups.Models
{
    public class GroupDto : IMapFrom<Group>
    {
        public int GroupId { get; set; }
        public string Name { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Group, GroupDto>()
                .ForMember(dest => dest.GroupId, opt => opt.MapFrom(s => s.GroupId))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(s => s.Name));
        }
    }
}