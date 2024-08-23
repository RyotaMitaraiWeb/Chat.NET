using Common.Enums;
using Contracts;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Web.Controllers;
using Web.ViewModels.Authentication;
using Web.ViewModels.ChatRoom;

namespace Tests.Unit.Controllers
{
    public class ChatRoomControllerTests
    {
        public IChatRoomService ChatRoomService { get; set; }
        public IJwtService JwtService { get; set; }
        public ChatRoomController ChatRoomController { get; set; }

        public UserClaimsViewModel Claims = new()
        {
            Id = "1",
            Username = "a"
        };

        public string Token = "1";

        [SetUp]
        public void SetUp()
        {
            this.ChatRoomService = Substitute.For<IChatRoomService>();
            this.JwtService = Substitute.For<IJwtService>();

            this.JwtService.ExtractUserFromJWT(this.Token).Returns(this.Claims);
            this.ChatRoomController = new ChatRoomController(this.ChatRoomService, this.JwtService);
        }

        [Test]
        public async Task Test_FindByIdReturnsOkWhenItRetrievesAChatRoom()
        {
            this.ChatRoomService.GetById(1, this.Claims.Id).Returns(new GetChatRoomViewModel()
                { 
                    Id = 1, 
                    Title = "a",
                    Description = "b"
                }
            );

            var result = await this.ChatRoomController.FindById(1, this.Claims.Id);

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
            this.ChatRoomService.GetById(1, this.Claims.Id).Returns(room);

            var result = await this.ChatRoomController.FindById(1, this.Claims.Id);

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

        [Test]
        public async Task Test_AddFavoriteReturnsNoContentWhenSuccessful()
        {
            string userId = "1";

            this.ChatRoomService.AddFavorite(1, userId).Returns(AddChatRoomFavoriteResult.Success);

            var result = await this.ChatRoomController.AddFavorite(1, this.Claims);

            Assert.That(result, Is.TypeOf<NoContentResult>());
        }

        [Test]
        public async Task Test_AddFavoriteReturns404IfRoomDoesNotExist()
        {
            string userId = "1";

            this.ChatRoomService.AddFavorite(1, userId).Returns(AddChatRoomFavoriteResult.UserOrChatRoomDoesNotExist);

            var result = await this.ChatRoomController.AddFavorite(1, this.Claims);

            Assert.That(result, Is.TypeOf<NotFoundObjectResult>());
        }

        [Test]
        public async Task Test_AddFavoriteReturnsBadRequestWhenTheRoomIsAlreadyFavorite()
        {
            string userId = "1";

            this.ChatRoomService.AddFavorite(1, userId).Returns(AddChatRoomFavoriteResult.AlreadyFavorite);

            var result = await this.ChatRoomController.AddFavorite(1, this.Claims);

            Assert.That(result, Is.TypeOf<BadRequestObjectResult>());
        }

        [Test]
        public async Task Test_RemoveFavoriteReturnsNoContentWhenSuccessful()
        {
            string userId = "1";

            this.ChatRoomService.RemoveFavorite(1, userId).Returns(RemoveChatRoomFavoriteResult.Success);

            var result = await this.ChatRoomController.RemoveFavorite(1, this.Claims);

            Assert.That(result, Is.TypeOf<NoContentResult>());
        }

        [Test]
        public async Task Test_RemoveFavoriteReturns404IfRoomDoesNotExist()
        {
            string userId = "1";

            this.ChatRoomService.RemoveFavorite(1, userId).Returns(RemoveChatRoomFavoriteResult.ChatRoomDoesNotExist);

            var result = await this.ChatRoomController.RemoveFavorite(1, this.Claims);

            Assert.That(result, Is.TypeOf<NotFoundObjectResult>());
        }

        [Test]
        public async Task Test_RemoveFavoriteReturnsBadRequestWhenTheRoomIsAlreadyFavorite()
        {
            string userId = "1";

            this.ChatRoomService.RemoveFavorite(1, userId).Returns(RemoveChatRoomFavoriteResult.NotFavorite);

            var result = await this.ChatRoomController.RemoveFavorite(1, this.Claims);

            Assert.That(result, Is.TypeOf<BadRequestObjectResult>());
        }
    }
}
