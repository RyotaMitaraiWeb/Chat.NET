using Common.Enums;
using Contracts;
using Infrastructure.Mongo;
using Infrastructure.Mongo.Entities;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Linq.Expressions;
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
                .FindAsync(BanExpression(ban.ChatRoomId, ban.Username), PunishmentFindOptions);
            
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
                .UpdateOneAsync(BanExpression(unban.ChatRoomId, unban.Username),
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

        public async Task<bool> CheckIfUserIsBanned(string username, int chatRoomId)
        {
            var currentBansDocuments = await this.punishmentsCollection
                .FindAsync(BanExpression(chatRoomId, username), PunishmentFindOptions);

            var currentBan = await currentBansDocuments.FirstOrDefaultAsync();
            return currentBan is not null;
        }

        private static Expression<Func<Punishment, bool>> BanExpression(int chatRoomId, string username)
        {
            return b => b.IsActive
                && b.ChatRoomId == chatRoomId
                && b.NormalizedUsername == username.ToUpper()
                && b.Type == Punishments.Ban;
        }

        private static readonly FindOptions<Punishment> PunishmentFindOptions = new () { Limit = 1 };
    }
}
