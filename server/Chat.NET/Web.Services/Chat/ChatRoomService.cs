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
       

        public async Task<AddChatRoomFavoriteResult> AddFavorite(int chatRoomId, string userId)
        {
            bool idIsValid = Guid.TryParse(userId, out Guid id);
            if (!idIsValid)
            {
                return AddChatRoomFavoriteResult.UserOrChatRoomDoesNotExist;
            }

            return await this.AddFavorite(chatRoomId, id);
        }

        public async Task<AddChatRoomFavoriteResult> AddFavorite(int chatRoomId, Guid userId)
        {
            var chatRoom = await this.repository.GetByIdAsync<ChatRoom>(chatRoomId);
            if (chatRoom is null || chatRoom?.IsDeleted == true)
            {
                return AddChatRoomFavoriteResult.UserOrChatRoomDoesNotExist;
            }

            var userFavorites = await this.repository
                .All<UserFavoriteChatRoom>()
                .Where(ufcr => ufcr.UserId.Equals(userId) && !ufcr.ChatRoom.IsDeleted)
                .Select(ufcr => new AddChatRoomFavoriteViewModel()
                {
                    Id = ufcr.ChatRoomId,
                    IsDeleted = ufcr.ChatRoom.IsDeleted,
                })
                .ToListAsync();

            bool roomIsAlreadyAdded = userFavorites.Find(uf => uf.Id == chatRoomId) is not null;
            if (roomIsAlreadyAdded)
            {
                return AddChatRoomFavoriteResult.AlreadyFavorite;
            }

            try
            {
                await this.repository.AddAsync(new UserFavoriteChatRoom()
                {
                    ChatRoomId = chatRoomId,
                    UserId = userId,
                });

                await this.repository.SaveChangesAsync();
            } catch (DbUpdateException)
            {
                return AddChatRoomFavoriteResult.UserOrChatRoomDoesNotExist;
            }

            return AddChatRoomFavoriteResult.Success;

        }

        public async Task<int> Create(CreateChatRoomViewModel chatRoom)
        {
            var room = new ChatRoom()
            {
                Title = chatRoom.Title,
                Description = chatRoom.Description,
                Tags = CreateTags(chatRoom.Tags),
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

        public async Task<GetChatRoomViewModel?> GetById(int chatRoomId, string userId)
        {
            var room = await this.repository.AllReadonly<ChatRoom>()
                .Where(cr => cr.Id == chatRoomId && !cr.IsDeleted)
                .Select(cr => new GetChatRoomViewModel()
                {
                    Id = cr.Id,
                    Title = cr.Title,
                    Description = cr.Description,
                    IsFavorite = cr.UserFavorites.FirstOrDefault(cr => cr.UserId.ToString() == userId) != null,
                })
                .FirstOrDefaultAsync();

            return room;
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
                    IsFavorite = false,
                })
                .FirstOrDefaultAsync();

            return room;
        }

        public async Task<bool> CheckIfRoomExists(int chatRoomId)
        {
            var room = await this.repository.AllReadonly<ChatRoom>().FirstOrDefaultAsync(cr => cr.Id == chatRoomId && !cr.IsDeleted);
            return room is not null;
        }

        public async Task<RemoveChatRoomFavoriteResult> RemoveFavorite(int chatRoomId, string userId)
        {
            bool idIsValid = Guid.TryParse(userId, out Guid id);
            if (!idIsValid)
            {
                return RemoveChatRoomFavoriteResult.NotFavorite;
            }

            return await this.RemoveFavorite(chatRoomId, id);
        }

        public async Task<RemoveChatRoomFavoriteResult> RemoveFavorite(int chatRoomId, Guid userId)
        {
            var chatRoom = await this.repository.GetByIdAsync<ChatRoom>(chatRoomId);
            if (chatRoom == null || chatRoom?.IsDeleted == true)
            {
                return RemoveChatRoomFavoriteResult.ChatRoomDoesNotExist;
            }

            var userFavorite = await repository
                .All<UserFavoriteChatRoom>()
                .FirstOrDefaultAsync(ufcr => ufcr.ChatRoomId == chatRoomId && userId.Equals(ufcr.UserId));

            if (userFavorite is null)
            {
                return RemoveChatRoomFavoriteResult.NotFavorite;
            }

            await this.repository.DeleteAsync<UserFavoriteChatRoom>(userFavorite.Id);
            await this.repository.SaveChangesAsync();

            return RemoveChatRoomFavoriteResult.Success;

        }

        public async Task<IEnumerable<GetChatRoomsViewModel>> Search(string title, string[] tags)
        {
            IEnumerable<string> normalizedTags = tags.Select(t => t.ToUpper());

            var rooms = await this.repository.AllReadonly<ChatRoom>()
                .Include(cr => cr.Tags)
                .Where(cr =>
                    cr.Title.Contains(title)
                    && !cr.IsDeleted
                    && normalizedTags
                        .All(normalizedTag => cr.Tags
                            .Any(tag => tag.NormalizedName
                            .Contains(normalizedTag))
                        )
                )
                .Select(cr => new GetChatRoomsViewModel()
                {
                    Id = cr.Id,
                    Title = cr.Title,
                    Description = cr.Description,
                    Tags = cr.Tags.Select(t => t.Name).ToArray(),
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
            room.Tags = CreateTags(chatRoom.Tags, chatRoomId);

            await this.repository.SaveChangesAsync();

            return ChatRoomUpdateResult.Success;
        }

        private static List<ChatRoomTag> CreateTags(string[] tags)
        {
            return tags.Select(t => new ChatRoomTag()
            {
                Name = t,
                NormalizedName = t.ToUpper(),
            }).ToList();
        }

        private static List<ChatRoomTag> CreateTags(string[] tags, int chatRoomId)
        {
            return tags.Select(t => new ChatRoomTag()
            {
                ChatRoomId = chatRoomId,
                Name = t,
                NormalizedName = t.ToUpper()
            }).ToList();
        }
    }
}
