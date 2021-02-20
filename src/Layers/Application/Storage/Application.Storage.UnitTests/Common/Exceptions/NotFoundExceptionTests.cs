using Application.Storage.API.Common.Exceptions;
using FluentAssertions;
using Moq;
using NUnit.Framework;

namespace Application.Storage.UnitTests.Common.Exceptions
{
    public class NotFoundExceptionTests
    {
        [Test]
        public void ConstructorCreatesAClearMessage()
        {
            var name = "ContactDto";
            var key = It.IsAny<object>();
            var message = $"Entity \"{name}\" ({key}) was not found.";

            var actual = new NotFoundException(name, key);

            actual.Message.Should().BeEquivalentTo(message);
        }
    }
}