using System.Net;

namespace Tests.Integration
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void Test1()
        {
            Assert.Pass();
        }

        [Test]
        public async Task Test2()
        {
            var client = new HttpClient();
            var res = await client.GetAsync("http://localhost:5000/WeatherForecast");
            Assert.That(res.StatusCode, Is.EqualTo(HttpStatusCode.OK));

        }
    }
}