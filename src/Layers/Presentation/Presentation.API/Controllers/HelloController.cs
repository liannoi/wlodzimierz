using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Presentation.API.Common.Controllers;

namespace Presentation.API.Controllers
{
    public class HelloController : AbstractController
    {
        private readonly ILogger<HelloController> _logger;

        public HelloController(ILogger<HelloController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<string>> Hello()
        {
            _logger.LogCritical("Hello from Controller");

            return "Hello";
        }
    }
}