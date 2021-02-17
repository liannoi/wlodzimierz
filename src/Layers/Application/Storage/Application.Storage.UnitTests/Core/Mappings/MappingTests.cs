using System;
using System.Runtime.Serialization;
using Application.Infrastructure.Identity.API.Common.Models;
using Application.Storage.API.Core.Mappings.Profiles;
using Application.Storage.API.Storage.Contacts.Models;
using Application.Storage.API.Storage.Users.Models;
using AutoMapper;
using Domain.API.Entities;
using NUnit.Framework;

namespace Application.Storage.UnitTests.Core.Mappings
{
    public class MappingTests
    {
        private readonly IConfigurationProvider _configuration;
        private readonly IMapper _mapper;

        public MappingTests()
        {
            _configuration = new MapperConfiguration(cfg => cfg.AddProfile<MappingProfile>());
            _mapper = _configuration.CreateMapper();
        }

        [Test]
        public void ShouldHaveValidConfiguration()
        {
            _configuration.AssertConfigurationIsValid();
        }

        [Test]
        [TestCase(typeof(Contact), typeof(ContactDto))]
        [TestCase(typeof(ApplicationUser), typeof(UserDto))]
        public void ShouldSupportMappingFromSourceToDestination(Type source, Type destination)
        {
            var instance = GetInstanceOf(source);

            _mapper.Map(instance, source, destination);
        }

        // Helpers.

        private object GetInstanceOf(Type type)
        {
            return type.GetConstructor(Type.EmptyTypes) != null
                ? Activator.CreateInstance(type)
                : FormatterServices.GetUninitializedObject(type);
        }
    }
}