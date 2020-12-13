using Application.API.Storage.Users.Contacts.Models;
using AutoMapper;
using Domain.API.Entities;
using Shouldly;
using Xunit;

namespace Application.UnitTests.Common.Mappings
{
    public class MappingTests : IClassFixture<MappingTestsFixture>
    {
        private readonly IConfigurationProvider _configuration;
        private readonly IMapper _mapper;

        public MappingTests(MappingTestsFixture fixture)
        {
            _configuration = fixture.ConfigurationProvider;
            _mapper = fixture.Mapper;
        }

        [Fact]
        public void ShouldHaveValidConfiguration()
        {
            _configuration.AssertConfigurationIsValid();
        }

        [Fact]
        public void ShouldMapContactToContactDto()
        {
            var entity = new Contact();

            var result = _mapper.Map<ContactDto>(entity);

            result.ShouldNotBeNull();
            result.ShouldBeOfType<ContactDto>();
        }
    }
}