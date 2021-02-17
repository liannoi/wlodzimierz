using Application.Infrastructure.Identity.API.Common.Models;
using Application.Storage.API.Core.Mappings.Interfaces;
using AutoMapper;

namespace Application.Storage.API.Storage.Users.Models
{
    public class UserDto : IMapFrom<ApplicationUser>
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Photo { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<ApplicationUser, UserDto>()
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(s => s.Id))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(s => s.UserName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(s => s.Email))
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(s => s.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(s => s.LastName))
                .ForMember(dest => dest.Photo, opt => opt.MapFrom(s => s.Photo));
        }
    }
}