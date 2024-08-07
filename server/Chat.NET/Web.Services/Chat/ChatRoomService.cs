﻿using Common.Enums;
using Contracts;
using Infrastructure.Postgres.Entities;
using Infrastructure.Postgres.Repository;
using Microsoft.EntityFrameworkCore;
using Web.ViewModels.ChatRoom;

namespace Web.Services.Chat
{
    public class ChatRoomService(IRepository repository) : IChatRoomService
    {
        private readonly IRepository repository = repository;

        public async Task<int> Create(CreateChatRoomViewModel chatRoom)
        {
            var room = new ChatRoom()
            {
                Title = chatRoom.Title,
                Description = chatRoom.Description,
            };

            await this.repository.AddAsync(room);
            await this.repository.SaveChangesAsync();

            return room.Id;
        }

        public async Task<ChatRoomDeleteResult> Delete(int chatRoomId)
        {
            var room = await this.repository.All<ChatRoom>().Where(c  => c.Id == chatRoomId && !c.IsDeleted).FirstOrDefaultAsync();

            if (room is null)
            {
                return ChatRoomDeleteResult.DoesNotExist;
            }

            room.IsDeleted = true;
            await this.repository.SaveChangesAsync();

            return ChatRoomDeleteResult.Success;
        }

        public async Task<GetChatRoomViewModel?> GetById(int chatRoomId)
        {
            var room = await this.repository.AllReadonly<ChatRoom>()
                .Where(cr => cr.Id == chatRoomId && !cr.IsDeleted)
                .Select(cr => new GetChatRoomViewModel()
                {
                    Id = cr.Id,
                    Title = cr.Title,
                    Description = cr.Description,
                })
                .FirstOrDefaultAsync();

            return room;
        }

        public async Task<IEnumerable<GetChatRoomsViewModel>> Search(string title = "")
        {
            var rooms = await this.repository.AllReadonly<ChatRoom>()
                .Where(cr => cr.Title.Contains(title) && !cr.IsDeleted)
                .Select(cr => new GetChatRoomsViewModel()
                {
                    Id = cr.Id,
                    Title = cr.Title,
                    Description = cr.Description,
                })
                .ToListAsync();

            return rooms;
        }

        public async Task<ChatRoomUpdateResult> Update(UpdateChatRoomViewModel chatRoom, int chatRoomId)
        {
            var room = await this.repository.All<ChatRoom>().Where(c => c.Id == chatRoomId && !c.IsDeleted).FirstOrDefaultAsync();
            if (room is null)
            {
                return ChatRoomUpdateResult.DoesNotExist;
            }

            room.Title = chatRoom.Title;
            room.Description = chatRoom.Description;

            await this.repository.SaveChangesAsync();

            return ChatRoomUpdateResult.Success;
        }
    }
}
