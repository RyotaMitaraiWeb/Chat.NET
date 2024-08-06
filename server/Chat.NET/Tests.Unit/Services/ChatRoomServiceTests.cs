using Common.Enums;
using Infrastructure.Postgres.Entities;
using Infrastructure.Postgres.Repository;
using MockQueryable.NSubstitute;
using NSubstitute;
using Web.Services.Chat;
using Web.ViewModels.ChatRoom;

namespace Tests.Unit.Services
{
    public class ChatRoomServiceTests
    {
        public IRepository Repository { get; set; } = Substitute.For<IRepository>();
        public ChatRoomService ChatRoomService { get; set; }

        public ChatRoomServiceTests()
        {
            this.ChatRoomService = new ChatRoomService(this.Repository);
        }

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
    }
}
