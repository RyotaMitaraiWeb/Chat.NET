using Common.Rules;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.ErrorMessages
{
    public static class ChatRoomErrorMessages
    {
        public static class Tags
        {
            public const string ContainDuplicateValues = "The tags cannot contain duplicate values (case insensitive)";
            public const string MaxLength = "You have more than 40 tags specified";
        }
    }
}
