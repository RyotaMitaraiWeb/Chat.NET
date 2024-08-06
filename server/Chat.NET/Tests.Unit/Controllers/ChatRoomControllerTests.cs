using Common.Enums;
using Contracts;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Web.Controllers;
using Web.ViewModels.ChatRoom;

namespace Tests.Unit.Controllers
{
    public class ChatRoomControllerTests
    {
        public IChatRoomService ChatRoomService { get; set; } = Substitute.For<IChatRoomService>();
        public ChatRoomController ChatRoomController { get; set; }

        public ChatRoomControllerTests()
        {
            this.ChatRoomController = new ChatRoomController(this.ChatRoomService);
        }

        [Test]
        public async Task Test_FindByIdReturnsOkWhenItRetrievesAChatRoom()
        {
            this.ChatRoomService.GetById(1).Returns(new GetChatRoomViewModel()
                { 
                    Id = 1, 
                    Title = "a",
                    Description = "b"
                }
            );

            var result = await this.ChatRoomController.FindById(1);

            var res = result as OkObjectResult;
            var content = res?.Value as GetChatRoomViewModel;

            Assert.Multiple(() =>
            {
                Assert.That(content?.Id, Is.EqualTo(1));
                Assert.That(content?.Title, Is.EqualTo("a"));
                Assert.That(content?.Description, Is.EqualTo("b"));
            });
        }

        [Test]
        public async Task Test_FindByIdReturnsNotFoundWhenItCannotFindTheChatRoom()
        {
            GetChatRoomViewModel? room = null;
            this.ChatRoomService.GetById(1).Returns(room);

            var result = await this.ChatRoomController.FindById(1);

            Assert.That(result, Is.TypeOf<NotFoundResult>());
        }

        [Test]
        public async Task Test_EditReturnsNoContentWhenItUpdatesSuccessfully()
        {
            UpdateChatRoomViewModel room = new();
            this.ChatRoomService.Update(room, 1).Returns(ChatRoomUpdateResult.Success);

            var result = await this.ChatRoomController.Edit(room, 1);

            Assert.That(result, Is.TypeOf<NoContentResult>());
        }

        [Test]
        public async Task Test_EditReturnsNotFoundWhenItDoesNotUpdate()
        {
            UpdateChatRoomViewModel room = new();
            this.ChatRoomService.Update(room, 1).Returns(ChatRoomUpdateResult.DoesNotExist);

            var result = await this.ChatRoomController.Edit(room, 1);

            Assert.That(result, Is.TypeOf<NotFoundResult>());
        }

        [Test]
        public async Task Test_DeleteReturnsNoContentWhenSuccessful()
        {
            this.ChatRoomService.Delete(1).Returns(ChatRoomDeleteResult.Success);

            var result = await this.ChatRoomController.Delete(1);

            Assert.That(result, Is.TypeOf<NoContentResult>());
        }

        [Test]
        public async Task Test_DeleteReturnsNotFoundWhenNotSuccessful()
        {
            this.ChatRoomService.Delete(1).Returns(ChatRoomDeleteResult.DoesNotExist);

            var result = await this.ChatRoomController.Delete(1);

            Assert.That(result, Is.TypeOf<NotFoundResult>());
        }
    }
}
