using Chat.NET;
using Infrastructure.Postgres.Entities;
using Infrastructure.Postgres.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Tests.Integration
{
    public class Tests2
    {
        public IntegrationTestWebAppFactory<Program> factory;
        public HttpClient client;
        public InMemoryDB testDb = new();
        public Repository repository;

        [SetUp]
        public async Task SetUp()
        {
            this.factory = new IntegrationTestWebAppFactory<Program>();
            this.client = this.factory.CreateClient();
            this.repository = testDb.Repository;
        }

        [TearDown]
        public async Task TearDown()
        {
            this.client.Dispose();
            await this.factory.DisposeAsync();
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

        [Test]
        public async Task InMemoryTest()
        {
            var user = new ApplicationUser()
            {
                UserName = "test125",
                NormalizedUserName = "TEST125",
                PasswordHash = "te2!Amla;sqw"
            };

            await repository.AddAsync(user);

            await repository.SaveChangesAsync();

            var test = await repository.All<ApplicationUser>().ToListAsync();
            Assert.That(test, Has.Count.EqualTo(1));
        }
    }
}
