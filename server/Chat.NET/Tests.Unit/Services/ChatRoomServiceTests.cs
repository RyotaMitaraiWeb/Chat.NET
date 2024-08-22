using Common.Enums;
using Infrastructure.Postgres.Entities;
using Infrastructure.Postgres.Repository;
using MockQueryable.NSubstitute;
using NSubstitute;
using NSubstitute.ExceptionExtensions;
using System.Data.Common;
using Web.Services.Chat;
using Web.ViewModels.ChatRoom;

namespace Tests.Unit.Services
{
    public class ChatRoomServiceTests
    {
        public IRepository Repository { get; set; }
        public ChatRoomService ChatRoomService { get; set; }

        public CreateChatRoomViewModel MockCreateRoom = new()
        {
            Title = "Test",
            Description = "Some lengthy description",
        };

        public UpdateChatRoomViewModel MockUpdateRoom = new()
        {
            Title = "Test",
            Description = "Some lengthy description",
        };

        public ChatRoom ChatRoomMock = new()
        {
            Id = 1,
            Title = "Test",
            Description= "Some length description",
        };

        [SetUp]
        public void SetUp()
        {
            this.Repository = Substitute.For<IRepository>();
            this.ChatRoomService = new ChatRoomService(this.Repository);
        }


        [Test]
        public async Task Test_UpdateReturnsSuccessWhenSuccessful()
        {
            this.Repository.All<ChatRoom>().Returns(new List<ChatRoom>() { new() { Id = 5 } }.BuildMock());
            
            this.Repository.When(r => r.SaveChangesAsync()).Do(r => { });

            ChatRoomUpdateResult result = await this.ChatRoomService.Update(this.MockUpdateRoom, 5);

            Assert.That(result, Is.EqualTo(ChatRoomUpdateResult.Success));
        }

        [Test]
        public async Task Test_UpdateReturnsDoesNotExistIfTheChatRoomDoesNotExist()
        {
            this.Repository.All<ChatRoom>().Returns(new List<ChatRoom>() { this.ChatRoomMock }.BuildMock());

            ChatRoomUpdateResult result = await this.ChatRoomService.Update(this.MockUpdateRoom, 2);

            Assert.That(result, Is.EqualTo(ChatRoomUpdateResult.DoesNotExist));
        }

        [Test]
        public async Task Test_UpdateReturnsDoesNotExistIfTheChatRoomIsDeleted()
        {
            this.Repository.All<ChatRoom>().Returns(new List<ChatRoom>() { 
                new() 
                { 
                    Id = 2,
                    IsDeleted = true
                }
            }.BuildMock());

            ChatRoomUpdateResult result = await this.ChatRoomService.Update(this.MockUpdateRoom, 2);

            Assert.That(result, Is.EqualTo(ChatRoomUpdateResult.DoesNotExist));
        }

        [Test]
        public async Task Test_DeleteReturnsSuccessWhenSuccessful()
        {
            this.Repository.All<ChatRoom>().Returns(new List<ChatRoom>() { this.ChatRoomMock }.BuildMock());
            
            this.Repository.When(r => r.SaveChangesAsync()).Do(r => { });

            ChatRoomDeleteResult result = await this.ChatRoomService.Delete(1);

            Assert.That(result, Is.EqualTo(ChatRoomDeleteResult.Success));
        }

        [Test]
        public async Task Test_DeleteReturnsDoesNotExistIfTheChatRoomDoesNotExist()
        {
            this.Repository.All<ChatRoom>().Returns(new List<ChatRoom>() { this.ChatRoomMock }.BuildMock());

            ChatRoomDeleteResult result = await this.ChatRoomService.Delete(2);

            Assert.That(result, Is.EqualTo(ChatRoomDeleteResult.DoesNotExist));
        }

        [Test]
        public async Task Test_DeleteReturnsDoesNotExistIfTheChatRoomIsDeleted()
        {
            this.Repository.All<ChatRoom>().Returns(new List<ChatRoom>() {
                new()
                {
                    Id = 2,
                    IsDeleted = true
                }
            }.BuildMock());

            ChatRoomDeleteResult result = await this.ChatRoomService.Delete(2);

            Assert.That(result, Is.EqualTo(ChatRoomDeleteResult.DoesNotExist));
        }

        [Test]
        public async Task Test_AddFavoriteReturnsANoExistResultIfChatRoomDoesNotExist()
        {
            Guid userId = Guid.NewGuid();

            ChatRoom? chatRoom = null;

            this.Repository.GetByIdAsync<ChatRoom>(userId).Returns(chatRoom);

            var result = await this.ChatRoomService.AddFavorite(1, userId);

            Assert.That(result, Is.EqualTo(AddChatRoomFavoriteResult.UserOrChatRoomDoesNotExist));
        }

        [Test]
        public async Task Test_AddFavoriteReturnsANoExistResultIfChatRoomIsDeleted()
        {
            Guid userId = Guid.NewGuid();

            var favorite = CreateMockFavorite(userId, 1, true);
            var chatRoom = favorite.ChatRoom;

            this.Repository.GetByIdAsync<ChatRoom>(userId).Returns(chatRoom);

            var result = await this.ChatRoomService.AddFavorite(chatRoom.Id, userId);

            Assert.That(result, Is.EqualTo(AddChatRoomFavoriteResult.UserOrChatRoomDoesNotExist));
        }

        [Test]
        public async Task Test_AddFavoriteReturnsAlreadyFavoriteIfTheRoomHasAlreadyBeenMarkedAsFavorite()
        {
            Guid userId = Guid.NewGuid();

            var favorite = CreateMockFavorite(userId, 1, false);
            var chatRoom = favorite.ChatRoom;

            this.Repository.GetByIdAsync<ChatRoom>(favorite.ChatRoomId).Returns(chatRoom);

            var query = CreateMockFavoriteQueryable(favorite);

            this.Repository.All<UserFavoriteChatRoom>().Returns(query);

            var result = await this.ChatRoomService.AddFavorite(chatRoom.Id, userId);

            Assert.That(result, Is.EqualTo(AddChatRoomFavoriteResult.AlreadyFavorite));
        }

        [Test]
        public async Task Test_AddFavoriteReturnsNoExistResultIfDbExceptionIsThrown()
        {
            Guid userId = Guid.NewGuid();

            var mockException = Substitute.For<DbException>();

            this.Repository.SaveChangesAsync().ThrowsAsync(mockException);

            var result = await this.ChatRoomService.AddFavorite(1, userId);

            Assert.That(result, Is.EqualTo(AddChatRoomFavoriteResult.UserOrChatRoomDoesNotExist));
        }

        [Test]
        public async Task Test_AddFavoriteReturnsSuccessWhenSuccessful()
        {
            Guid userId = Guid.NewGuid();

            var favorite = CreateMockFavorite(userId, 1, false);

            this.Repository.GetByIdAsync<ChatRoom>(2).Returns(new ChatRoom() { Id = 2 });

            var query = CreateMockFavoriteQueryable(favorite);

            this.Repository.All<UserFavoriteChatRoom>().Returns(query);

            var result = await this.ChatRoomService.AddFavorite(2, userId);

            Assert.That(result, Is.EqualTo(AddChatRoomFavoriteResult.Success));
        }

        [Test]
        public async Task Test_RemoveFavoriteReturnsNoExistResultIfTheChatRoomDoesNotExist()
        {
            var userId = Guid.NewGuid();

            ChatRoom? room = null;

            this.Repository.GetByIdAsync<ChatRoom>(1).Returns(room);

            var result = await this.ChatRoomService.RemoveFavorite(1, userId);

            Assert.That(result, Is.EqualTo(RemoveChatRoomFavoriteResult.ChatRoomDoesNotExist));
        }

        [Test]
        public async Task Test_RemoveFavoriteReturnsNoExistResultIfTheChatRoomIsDeleted()
        {
            var userId = Guid.NewGuid();

            var favorite = CreateMockFavorite(userId, 1, true);

            this.Repository.GetByIdAsync<ChatRoom>(1).Returns(favorite.ChatRoom);

            var result = await this.ChatRoomService.RemoveFavorite(1, userId);

            Assert.That(result, Is.EqualTo(RemoveChatRoomFavoriteResult.ChatRoomDoesNotExist));
        }

        [Test]
        public async Task Test_RemoveFavoriteReturnsNotFavoriteResultIfTheUserDoesNotHaveTheRoomAsAFavorite()
        {
            var userId = Guid.NewGuid();

            var favorite = CreateMockFavorite(userId, 2);
            var query = CreateMockFavoriteQueryable(favorite);

            this.Repository.GetByIdAsync<ChatRoom>(1).Returns(new ChatRoom() { Id = 1 });
            this.Repository.All<UserFavoriteChatRoom>().Returns(query);

            var result = await this.ChatRoomService.RemoveFavorite(1, userId);

            Assert.That(result, Is.EqualTo(RemoveChatRoomFavoriteResult.NotFavorite));
        }

        [Test]
        public async Task Test_RemoveFavoriteReturnsSucccessWhenSuccessful()
        {
            var userId = Guid.NewGuid();

            var favorite = CreateMockFavorite(userId, 1);
            var query = CreateMockFavoriteQueryable(favorite);

            this.Repository.GetByIdAsync<ChatRoom>(1).Returns(favorite.ChatRoom);
            this.Repository.All<UserFavoriteChatRoom>().Returns(query);

            var result = await this.ChatRoomService.RemoveFavorite(1, userId);

            Assert.That(result, Is.EqualTo(RemoveChatRoomFavoriteResult.Success));
        }

        private static UserFavoriteChatRoom CreateMockFavorite(Guid userId, int chatRoomId, bool isDeleted = false, int id = 1)
        {
            return new UserFavoriteChatRoom()
            {
                Id = 1,
                UserId = userId,
                ChatRoomId = chatRoomId,
                ChatRoom = new ChatRoom() { Id = chatRoomId, IsDeleted = isDeleted },
                User = new ApplicationUser() { Id = userId },
            };
        }

        private static IQueryable<UserFavoriteChatRoom> CreateMockFavoriteQueryable(params UserFavoriteChatRoom[] favorites)
        {
            return favorites.BuildMock();
        }
    }
}
