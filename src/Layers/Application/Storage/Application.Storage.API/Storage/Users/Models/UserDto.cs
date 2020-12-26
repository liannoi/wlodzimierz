using Application.Infrastructure.Identity.API.Models;
using Application.Mappings.API.Interfaces;
using AutoMapper;

namespace Application.Storage.API.Storage.Users.Models
{
    public class UserDto : IMapFrom<ApplicationUser>
    {
        public string UserId { get; set; }
        public string UserName { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<ApplicationUser, UserDto>()
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(s => s.Id))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(s => s.UserName));
        }
    }
}