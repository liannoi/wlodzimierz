using System;
using System.Linq.Expressions;
using Application.Filtration.API.Common.Interfaces;
using Application.Infrastructure.Identity.API.Common.Models;
using Application.Storage.API.Common.Mappings.Interfaces;
using AutoMapper;
using LinqKit;

namespace Application.Storage.API.Storage.Users.Models
{
    public class UserDto : IMapFrom<ApplicationUser>, IFilterable<UserDto>
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Photo { get; set; }

        public Expression<Func<UserDto, bool>> Filter()
        {
            var predicate = PredicateBuilder.New<UserDto>(true);
            if (!string.IsNullOrEmpty(UserName)) predicate = predicate.And(e => e.UserName.Contains(UserName));

            return predicate;
        }

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