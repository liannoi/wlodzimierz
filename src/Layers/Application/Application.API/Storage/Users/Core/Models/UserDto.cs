using Application.API.Common.Mappings;
using Application.API.Storage.Users.Core.Models.Domain;
using AutoMapper;

namespace Application.API.Storage.Users.Core.Models
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