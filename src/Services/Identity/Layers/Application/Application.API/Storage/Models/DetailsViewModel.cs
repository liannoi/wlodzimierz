using Application.API.Common.Mappings;
using AutoMapper;
using Domain.API.Entities;

namespace Application.API.Storage.Models
{
    public class DetailsViewModel : IMapFrom<ApplicationUser>
    {
        public int UserId { get; set; }
        public string UserName { get; set; } = null!;

        public void Mapping(Profile profile)
        {
            profile.CreateMap<ApplicationUser, DetailsViewModel>()
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(s => s.Id))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(s => s.UserName));
        }
    }
}