using Redis.OM.Modeling;

namespace Infrastructure.Redis.Models
{
    [Document(StorageType = StorageType.Json)]
    public class ChatRoomUsers
    {
        [Indexed]
        [RedisIdField]
        public int Id { get; set; }

        [Indexed]
        public ICollection<ChatRoomUser> Users { get; set; } = [];
    }
}
