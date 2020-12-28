using Application.Storage.API.Common.Mappings.Interfaces;
using Application.Storage.API.Storage.Users.Models;
using AutoMapper;
using Domain.API.Entities;

namespace Application.Storage.API.Storage.Contacts.Models
{
    public class ContactDto : IMapFrom<Contact>
    {
        public int ContactId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Photo { get; set; }
        public UserDto OwnerUser { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Contact, ContactDto>()
                .ForMember(dest => dest.ContactId, opt => opt.MapFrom(s => s.ContactId))
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(s => s.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(s => s.LastName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(s => s.Email))
                .ForMember(dest => dest.Photo, opt => opt.MapFrom(s => s.Photo))
                .ForMember(dest => dest.OwnerUser, opt => opt.Ignore());
        }
    }
}