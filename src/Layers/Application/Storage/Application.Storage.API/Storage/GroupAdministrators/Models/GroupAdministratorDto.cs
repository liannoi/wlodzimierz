using Application.Storage.API.Core.Mappings.Interfaces;
using Application.Storage.API.Storage.Groups.Models;
using AutoMapper;
using Domain.API.Entities;

namespace Application.Storage.API.Storage.GroupAdministrators.Models
{
    public class GroupAdministratorDto : IMapFrom<GroupAdministrator>
    {
        public int GroupAdministratorId { get; set; }
        public GroupDto Group { get; set; }
        public string AdministratorUserId { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<GroupAdministrator, GroupAdministratorDto>()
                .ForMember(dest => dest.GroupAdministratorId, opt => opt.MapFrom(s => s.GroupAdministratorId))
                .ForMember(dest => dest.Group, opt => opt.MapFrom(s => s.Group))
                .ForMember(dest => dest.AdministratorUserId, opt => opt.MapFrom(s => s.AdministratorUserId));
        }
    }
}