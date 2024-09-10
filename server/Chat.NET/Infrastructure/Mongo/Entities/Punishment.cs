using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using Common.Enums;

namespace Infrastructure.Mongo.Entities
{
    public class Punishment
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string? Username { get; set; }
        public string? NormalizedUsername { get; set; }

        public int ChatRoomId { get; set; }

        public string Reason { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public Punishments Type { get; set; }
    }
}
