using Infrastructure.Postgres.Entities;
using Infrastructure.Postgres.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Chat.NET.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly UserManager<ApplicationUser> userManager;
        public WeatherForecastController(ILogger<WeatherForecastController> logger, UserManager<ApplicationUser> userManager)
        {
            _logger = logger;
            this.userManager = userManager;
        }

        [HttpGet("GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpGet("Test")]
        public async Task<object> Test()
        {
            var result = await this.userManager.CreateAsync(new ApplicationUser()
            {
                UserName = "Test",
                NormalizedUserName = "TEST",
            }, "123456Asz!");
            
            return Ok();
        }

        [HttpGet("Test2")]
        public async Task<object> Test2()
        {
            var user = await this.userManager.FindByNameAsync("Test");
            if (user == null)
            {
                return NotFound();
            }

            return Ok();
        }
    }
}
