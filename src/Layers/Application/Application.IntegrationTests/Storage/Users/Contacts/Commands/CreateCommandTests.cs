using System;
using System.Threading.Tasks;
using Application.API.Storage.Users.Contacts.Commands.Create;
using Application.API.Storage.Users.Core.Models;
using Domain.API.Entities;
using FluentAssertions;
using Moq;
using NUnit.Framework;

namespace Application.IntegrationTests.Storage.Users.Contacts.Commands
{
    using static Testing;

    public class CreateCommandTests : AbstractTests
    {
        [Test]
        public void ShouldRequireMinimumFields()
        {
            FluentActions.Invoking(() => SendAsync(new CreateCommand()))
                .Should()
                .Throw<NullReferenceException>();
        }

        [Test]
        public async Task ShouldCreateContact()
        {
            var userId = It.IsAny<Guid>().ToString();
            var userName = await RunAsDefaultUserAsync();

            var command = new CreateCommand
            {
                OwnerUser = new UserDto {UserId = userId, UserName = userName},
                FirstName = "FirstName",
                LastName = "LastName",
                Email = "fantastic@email.com",
                Photo = null
            };

            var result = await FindAsync<Contact>(await SendAsync(command));

            result.Should().NotBeNull();
            result.ContactId.Should().BeGreaterOrEqualTo(1);
            result.OwnerUserId.Should().Be(command.OwnerUser.UserId);
        }
    }
}