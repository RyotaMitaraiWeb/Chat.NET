﻿using System.ComponentModel.DataAnnotations;

namespace Web.ViewModels.ChatRoom
{
    public class SendChatRoomMessageViewModel
    {
        public string Message { get; set; } = string.Empty;
        public int ChatRoomId { get; set; }
    }
}
