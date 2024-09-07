﻿using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Infrastructure.Mongo.Entities
{
    public class Punishment
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string? UserId { get; set; }

        public int ChatRoomId { get; set; }

        public string Reason { get; set; } = string.Empty;
        public bool IsActive { get; set; }
    }
}