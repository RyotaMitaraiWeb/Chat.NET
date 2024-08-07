using Common.Authentication;
using Common.Enums;
using Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.ViewModels.ChatRoom;

namespace Web.Controllers
{
    [Route("/chat")]
    [ApiController]
    public class ChatRoomController(IChatRoomService chatRoomService) : BaseController
    {
        private readonly IChatRoomService chatRoomService = chatRoomService;

        [HttpGet]
        [Route("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> FindById(int id)
        {
            var room = await this.chatRoomService.GetById(id);
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
    }
}
