﻿using Contracts;
using Infrastructure.Redis.Models;
using Microsoft.EntityFrameworkCore;
using Redis.OM;
using Redis.OM.Searching;
using System.Collections.Concurrent;
using Web.ViewModels.Authentication;
using Web.ViewModels.ChatRoom;

namespace Web.Services.Chat
{
    public class ChatRoomManager(RedisConnectionProvider provider) : IChatRoomManager
    {
        private readonly RedisCollection<ChatRoomUsers> rooms = (RedisCollection<ChatRoomUsers>)provider.RedisCollection<ChatRoomUsers>();
        public async Task<bool> AddUserToRoom(string connectionId, UserClaimsViewModel claims, int chatRoomId)
        {
            bool userIsNew = false;
            var room = await rooms.FirstOrDefaultAsync(r => r.Id == chatRoomId);
            if (room is null)
            {
                await rooms.InsertAsync(new ChatRoomUsers { Id = chatRoomId, Users = [] });
                room = await rooms.FirstAsync(r => r.Id == chatRoomId);
            }

            var user = room.Users.FirstOrDefault(u => u.UserId == claims.Id);

            if (user is null)
            {
                room.Users.Add(new ChatRoomUser() { UserId = claims.Id, Username = claims.Username, Users = [] });
                user = room.Users.First(u => u.UserId == claims.Id);
                userIsNew = true;
            }

            var connectionIds = user.Users;
            if (!connectionIds.Contains(connectionId))
            {
                connectionIds.Add(connectionId);
            }

            await rooms.SaveAsync();
            return userIsNew;
        }

        public async Task<IEnumerable<string>> BanUser(int chatRoomId, string userId)
        {
            var room = await rooms
                .FirstOrDefaultAsync((room => room.Id == chatRoomId));
            if (room == null)
            {
                return [];
            }

            var user = room.Users
                .FirstOrDefault(user => user.UserId == userId);

            if (user is null)
            {
                return [];
            }

            room.Users.Remove(user);
            await this.rooms.SaveAsync();

            return user.Users;
            
        }

        public async Task<IEnumerable<int>> GetRoomsOfUser(string userId)
        {
            var userRooms = await rooms.AsNoTracking().ToListAsync();
            return userRooms.Where(ur => ur.Users.Select(u => u.UserId).Contains(userId)).Select(ur => ur.Id);
        }

        public async Task<IEnumerable<UserOnUserListViewModel>> GetUsersOnline(int chatRoomId)
        {
            var room = await rooms.FirstOrDefaultAsync(r => r.Id == chatRoomId);
            if (room is null)
            {
                return Enumerable.Empty<UserOnUserListViewModel>();
            }

            return room.Users.Select(u => new UserOnUserListViewModel()
            {
                Id = u.UserId,
                Username = u.Username,
            });
        }

        public async Task<bool> RemoveConnectionIdFromRoom(string connectionId, UserClaimsViewModel claims, int chatRoomId)
        {
            var room = await rooms.FirstOrDefaultAsync(r => r.Id == chatRoomId);
            if (room is null)
            {
                return false;
            }

            var user = room.Users.FirstOrDefault(u => u.UserId == claims.Id);

            if (user is null)
            {
                return false;
            }

            var connectionIds = user.Users;
            bool result = connectionIds.Remove(connectionId);

            if (connectionIds.Count == 0)
            {
                room.Users.Remove(user);
            }

            await rooms.SaveAsync();
            return result && connectionIds.Count == 0;
        }

        public async Task RemoveUserFromRoom(UserClaimsViewModel claims, int chatRoomId)
        {
            var room = await rooms.FirstOrDefaultAsync(r => r.Id == chatRoomId);
            if (room is null)
            {
                return;
            }

            var user = room.Users.FirstOrDefault(u => u.UserId == claims.Id);

            if (user is null)
            {
                return;
            }

            user.Users = [];
            await rooms.SaveAsync();
        }
    }
}
