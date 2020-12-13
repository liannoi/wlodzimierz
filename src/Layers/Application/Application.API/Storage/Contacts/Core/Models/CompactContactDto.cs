using Application.API.Common.Mappings.Interfaces;
using AutoMapper;
using Domain.API.Entities;

namespace Application.API.Storage.Contacts.Core.Models
{
    public class CompactContactDto : IMapFrom<Contact>
    {
        public int ContactId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Photo { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Contact, CompactContactDto>()
                .ForMember(dest => dest.ContactId, opt => opt.MapFrom(s => s.ContactId))
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(s => s.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(s => s.LastName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(s => s.Email))
                .ForMember(dest => dest.Photo, opt => opt.MapFrom(s => s.Photo));
        }
    }
}