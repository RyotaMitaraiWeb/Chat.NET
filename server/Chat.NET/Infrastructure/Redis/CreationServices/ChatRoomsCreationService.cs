using Infrastructure.Redis.Models;
using Microsoft.Extensions.Hosting;
using Redis.OM;

namespace Infrastructure.Redis.CreationServices
{
    public class ChatRoomsCreationService(RedisConnectionProvider provider) : IHostedService
    {
        private readonly RedisConnectionProvider _provider = provider;

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            await _provider.Connection.CreateIndexAsync(typeof(ChatRoomUsers));
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
