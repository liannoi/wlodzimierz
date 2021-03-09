using System;
using System.Linq.Expressions;
using Application.Filtration.API.Common.Interfaces;
using Application.Storage.API.Common.Mappings.Interfaces;
using Application.Storage.API.Storage.Users.Models;
using AutoMapper;
using Domain.API.Entities;
using LinqKit;

namespace Application.Storage.API.Storage.Contacts.Models
{
    public class ContactDto : IMapFrom<Contact>, IFilterable<ContactDto>
    {
        public int ContactId { get; set; }
        public UserDto OwnerUser { get; set; }
        public UserDto ContactUser { get; set; }
        public string FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Photo { get; set; }

        public Expression<Func<ContactDto, bool>> Filter()
        {
            var predicate = PredicateBuilder.New<ContactDto>(true);
            if (!string.IsNullOrEmpty(FirstName)) predicate = predicate.And(g => g.FirstName.Contains(FirstName));
            if (!string.IsNullOrEmpty(LastName)) predicate = predicate.And(g => g.LastName.Contains(LastName));
            if (!string.IsNullOrEmpty(Email)) predicate = predicate.And(g => g.Email.Contains(Email));

            return predicate;
        }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Contact, ContactDto>()
                .ForMember(dest => dest.ContactId, opt => opt.MapFrom(s => s.ContactId))
                .ForMember(dest => dest.OwnerUser, opt => opt.MapFrom(s => s))
                .ForMember(dest => dest.ContactUser, opt => opt.MapFrom(s => s))
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(s => s.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(s => s.LastName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(s => s.Email))
                .ForMember(dest => dest.Photo, opt => opt.MapFrom(s => s.Photo));

            profile.CreateMap<Contact, UserDto>()
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(s => s.OwnerUserId))
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(s => s.ContactUserId));
        }
    }
}