using Common.Authentication;
using Common.Enums;
using Common.ErrorMessages;
using Common.Util;
using Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.ViewModels.ChatRoom;

namespace Web.Controllers
{
    [Route("/chat")]
    [ApiController]
    public class ChatRoomController(IChatRoomService chatRoomService, IJwtService jwtService) : BaseController
    {
        private readonly IChatRoomService chatRoomService = chatRoomService;
        private readonly IJwtService jwtService = jwtService;

        [HttpGet]
        [Route("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> FindById(int id, [FromHeader(Name = "Authorization")] string token)
        {
            var claims = this.jwtService.ExtractUserFromJWT(token);
            var room = await this.chatRoomService.GetById(id, claims.Id);
            if (room is null)
            {
                return NotFound();
            }

            return Ok(room);
        }

        [HttpGet]
        [Route("")]
        [AllowAnonymous]
        public async Task<IActionResult> Search([FromQuery] string title = "")
        {
            var rooms = await this.chatRoomService.Search(title: title);
            return Ok(rooms);
        }

        [HttpPost]
        [Route("")]
        [Authorize(Policy = Policies.IsModerator)]
        public async Task<IActionResult> Create(CreateChatRoomViewModel chatRoom)
        {
            int chatRoomId = await this.chatRoomService.Create(chatRoom);
            var result = new CreatedChatRoomViewModel()
            {
                Id = chatRoomId,
            };

            return Created($"/chat/room/{chatRoomId}", result);
        }

        [HttpPut]
        [Route("{id}")]
        [Authorize(Policy = Policies.IsModerator)]
        public async Task<IActionResult> Edit(UpdateChatRoomViewModel chatRoom, int id)
        {
            var result = await this.chatRoomService.Update(chatRoom, id);

            if (result == ChatRoomUpdateResult.DoesNotExist)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(Policy = Policies.IsModerator)]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await this.chatRoomService.Delete(id);

            if (result == ChatRoomDeleteResult.DoesNotExist)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPut]
        [Route("{id}/favorite")]
        public async Task<IActionResult> AddFavorite(int id, [FromHeader(Name = "Authorization")] string token = "")
        {
            var claims = this.jwtService.ExtractUserFromJWT(token);
            AddChatRoomFavoriteResult result = await this.chatRoomService.AddFavorite(id, claims.Id);

            if (result == AddChatRoomFavoriteResult.Success)
            {
                return NoContent();
            }

            ErrorResponse error = FavoriteChatRoomsErrorMessages.GenerateErrorMessage(result);

            if (result == AddChatRoomFavoriteResult.UserOrChatRoomDoesNotExist)
            {
                return NotFound(error);
            }

            return BadRequest(error);
        }

        [HttpDelete]
        [Route("{id}/favorite")]
        public async Task<IActionResult> RemoveFavorite(int id, [FromHeader(Name = "Authorization")] string token = "")
        {
            var claims = this.jwtService.ExtractUserFromJWT(token);

            RemoveChatRoomFavoriteResult result = await this.chatRoomService.RemoveFavorite(id, claims.Id);

            if (result == RemoveChatRoomFavoriteResult.Success)
            {
                return NoContent();
            }

            ErrorResponse error = FavoriteChatRoomsErrorMessages.GenerateErrorMessage(result);

            if (result == RemoveChatRoomFavoriteResult.ChatRoomDoesNotExist)
            {
                return NotFound(error);
            }

            return BadRequest(error);
        }
    }
}
