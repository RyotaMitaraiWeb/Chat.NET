using Redis.OM.Modeling;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Redis.Models
{
    [Document(StorageType = StorageType.Json)]
    public class UserSession
    {
        [RedisIdField]
        [Indexed]
        public string Id { get; set; } = string.Empty;

        [Indexed]
        public string Username { get; set; } = string.Empty;
        [Indexed]
        public string[] Roles { get; set; } = [];

    }
}
