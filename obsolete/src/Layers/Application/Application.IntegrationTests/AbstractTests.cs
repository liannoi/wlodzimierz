using System.Threading.Tasks;
using NUnit.Framework;

namespace Application.IntegrationTests
{
    using static Testing;

    public class AbstractTests
    {
        [SetUp]
        public async Task Setup()
        {
            await ResetState();
        }
    }
}