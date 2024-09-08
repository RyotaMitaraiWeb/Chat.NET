using Common.Enums;
using Contracts;
using Infrastructure.Mongo;
using Infrastructure.Mongo.Entities;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using Web.ViewModels.Commands;

namespace Web.Services.Chat
{
    public class CommandsService : ICommandService
    {
        private readonly IMongoCollection<Punishment> punishmentsCollection;
        public CommandsService(IOptions<PunishmentDatabaseSettings> punishmentSettings)
        {
            var mongoClient = new MongoClient(punishmentSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(punishmentSettings.Value.DatabaseName);

            var collection = mongoDatabase.GetCollection<Punishment>(punishmentSettings.Value.PunishmentCollectionName);
            this.punishmentsCollection = collection;
        }

        public async Task<BanCommandResult> Ban(BanCommandViewModel ban)
        {
            var currentBansDocuments = await this.punishmentsCollection
                .FindAsync(b => 
                    b.IsActive && b.ChatRoomId == ban.ChatRoomId 
                    && b.NormalizedUsername == ban.Username.ToUpper()
                    && b.Type == Punishments.Ban, new FindOptions<Punishment>() { Limit = 1 });
            
            var currentBan = await currentBansDocuments.FirstOrDefaultAsync();
            if (currentBan is not null)
            {
                return BanCommandResult.AlreadyBanned;
            }

            Punishment punishment = new () {
                ChatRoomId = ban.ChatRoomId,
                Username = ban.Username,
                NormalizedUsername = ban.Username.ToUpper(),
                IsActive = true,
                Reason = ban.Reason,
                Type = Punishments.Ban,
            };

            await this.punishmentsCollection.InsertOneAsync(punishment);
            return BanCommandResult.Success;
        }

        public async Task<UnbanCommandResult> Unban(UnbanCommandViewModel unban)
        {
            var update = Builders<Punishment>.Update.Set(ban => ban.IsActive, false);

            var result = await this.punishmentsCollection
                .UpdateOneAsync(b => 
                    b.IsActive && b.ChatRoomId == unban.ChatRoomId
                    && b.NormalizedUsername == unban.Username.ToUpper()
                    && b.Type == Punishments.Ban,
                update);

           if (result.IsAcknowledged && result.ModifiedCount > 0)
            {
                return UnbanCommandResult.Success;
            }

            return UnbanCommandResult.NotBanned;
        }

        public async Task Warn(WarnCommandViewModel warn)
        {
            Punishment punishment = new()
            {
                ChatRoomId = warn.ChatRoomId,
                Username = warn.Username,
                NormalizedUsername = warn.Username.ToUpper(),
                Reason = warn.Reason,
                IsActive = false,
                Type = Punishments.Warn,
            };

            await this.punishmentsCollection.InsertOneAsync(punishment);
        }
    }
}
