using Contracts;
using Infrastructure.Postgres.Entities;
using Infrastructure.Postgres.Repository;
using Microsoft.EntityFrameworkCore;
using Web.ViewModels.Authentication;
using Web.ViewModels.ChatRoom;

namespace Web.Services.Chat
{
    public class ChatRoomMessageService(IRepository repository) : IChatRoomMessageService
    {
        private readonly IRepository repository = repository;
        public async Task<GetChatRoomMessageViewModel?> CreateMessage(SendChatRoomMessageViewModel chatRoomMessageViewModel, UserClaimsViewModel claims, DateTime today)
        {
            var chatRoom = await this.repository
                    .AllReadonly<ChatRoom>()
                    .FirstOrDefaultAsync(c => c.Id == chatRoomMessageViewModel.ChatRoomId);

            if (chatRoom is null)
            {
                return null;
            }

            var chatRoomMessage = new ChatRoomMessage()
            {
                ChatRoomId = chatRoomMessageViewModel.ChatRoomId,
                SenderId = Guid.Parse(claims.Id),
                Date = today,
                Content = chatRoomMessageViewModel.Message,
            };

            await repository.AddAsync(chatRoomMessage);
            await repository.SaveChangesAsync();

            return new GetChatRoomMessageViewModel
            {
                ChatRoomId = chatRoomMessage.ChatRoomId,
                Id = chatRoomMessage.Id,
                Content = chatRoomMessage.Content,
                Date = chatRoomMessage.Date,
                Sender = new ChatRoomMessageSenderViewModel()
                {
                    Id = claims.Id,
                    Username = claims.Username,
                },
            };
        }

        public async Task<IEnumerable<GetChatRoomMessageViewModel>> GetRecentMessages(int chatRoomId)
        {
            return await this.repository
                .AllReadonly<ChatRoomMessage>()
                .OrderByDescending(crm => crm.Date)
                .Take(50)
                .Select(crm => new GetChatRoomMessageViewModel()
                {
                    ChatRoomId = crm.ChatRoomId,
                    Id = crm.Id,
                    Content = crm.Content,
                    Date = crm.Date,
                    Sender = new ChatRoomMessageSenderViewModel()
                    {
                        Id = crm.SenderId.ToString(),
                        Username = crm.Sender.UserName!,
                    }
                })
                .ToListAsync();
        }
    }
}
