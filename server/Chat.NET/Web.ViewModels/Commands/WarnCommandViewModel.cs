﻿namespace Web.ViewModels.Commands
{
    public class WarnCommandViewModel
    {
        public int ChatRoomId { get; set; }
        public string UserId { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Reason { get; set; } = string.Empty;
    }
}
