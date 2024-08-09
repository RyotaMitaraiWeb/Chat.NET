using Redis.OM.Modeling;

namespace Infrastructure.Redis.Models
{
    [Document(StorageType = StorageType.Json)]
    public class ChatRoomUser
    {
        [RedisIdField]
        [Indexed]
        public string UserId { get; set; } = string.Empty;

        [RedisField]
        [Indexed]
        public string Username { get; set; }

        [Indexed]
        public ICollection<string> Users { get; set; } = [];
    }
}
