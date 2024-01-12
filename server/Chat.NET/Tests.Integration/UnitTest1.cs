using Chat.NET;
using System.Net;

namespace Tests.Integration
{
    public class Tests
    {
        public IntegrationTestWebAppFactory<Program> factory;
        public HttpClient client;
        

        [SetUp]
        public async Task SetUp()
        {
            this.factory = new IntegrationTestWebAppFactory<Program>();
            this.client = this.factory.CreateClient();
        }

        [TearDown]
        public async Task TearDown()
        {
            try
            {
                this.client.Dispose();
                await this.factory.DisposeAsync();
            }
            catch { }
            
        }

        [Test]
        public void Test()
        {
            Assert.Pass();
        }

        [Test]
        public async Task TestDBConnection()
        {
            var res = await this.client.GetAsync("/WeatherForecast/Test");
            Assert.That(res.StatusCode, Is.EqualTo(HttpStatusCode.OK));

        }

        [Test]
        public async Task TestSharedState()
        {
            var res = await this.client.GetAsync("/WeatherForecast/Test2");
            Assert.That(res.StatusCode, Is.EqualTo(HttpStatusCode.NotFound));
        }
    }
}