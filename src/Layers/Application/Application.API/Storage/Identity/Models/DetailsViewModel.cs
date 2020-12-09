using Application.API.Common.Mappings;
using Application.API.Storage.Identity.Models.Core;
using AutoMapper;

namespace Application.API.Storage.Identity.Models
{
    public class DetailsViewModel : IMapFrom<ApplicationUser>
    {
        public string UserId { get; set; }
        public string UserName { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<ApplicationUser, DetailsViewModel>()
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(s => s.Id))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(s => s.UserName));
        }
    }
}