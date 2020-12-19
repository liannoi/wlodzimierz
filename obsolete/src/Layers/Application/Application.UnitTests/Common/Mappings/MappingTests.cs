using System;
using System.Runtime.Serialization;
using Application.API.Common.Mappings;
using Application.API.Storage.Contacts.Models;
using AutoMapper;
using Domain.API.Entities;
using FluentAssertions;
using NUnit.Framework;

namespace Application.UnitTests.Common.Mappings
{
    public class MappingTests
    {
        private readonly IConfigurationProvider _configuration;
        private readonly IMapper _mapper;

        public MappingTests()
        {
            _configuration = new MapperConfiguration(cfg => { cfg.AddProfile<MappingProfile>(); });
            _mapper = _configuration.CreateMapper();
        }

        [Test]
        public void ShouldHaveValidConfiguration()
        {
            _configuration.AssertConfigurationIsValid();
        }

        [Test]
        [TestCase(typeof(Contact), typeof(ContactDto))]
        public void ShouldSupportMappingFromSourceToDestination(Type source, Type destination)
        {
            // Arrange
            var instance = GetInstanceOf(source);

            // Act
            var result = _mapper.Map(instance, source, destination);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeOfType(destination);
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