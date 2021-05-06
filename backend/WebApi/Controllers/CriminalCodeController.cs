using Api.Dtos;
using Api.Services.AppServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("code")]
    [Authorize]
    public class CriminalCodeController : ControllerBase
    {
        private readonly CriminalCodeService _service;
        public CriminalCodeController(CriminalCodeService service)
        {
            _service = service;
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllCriminalCodes([FromQuery] string filter = null, [FromQuery] int page = 0)
        {
            return Ok(await _service.GetAllCriminalCode(filter, page));
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> UpdateCriminalCode([FromRoute] int id)
        {
            return Ok(await _service.GetCriminalCode(id));
        }

        [HttpPost("")]
        public async Task<IActionResult> CreateCriminalCode([FromBody] CriminalCodeAllDto criminalCodeDto)
        {
            await _service.CreateCriminalCode(int.Parse(User.Identity.Name), criminalCodeDto);
            return Ok();
        }

        [HttpDelete("")]
        public async Task<IActionResult> DeleteCriminalCode([FromQuery] int id)
        {
            await _service.DeleteCriminalCode(id);
            return Ok();
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateCriminalCode([FromRoute] int id, [FromBody] CriminalCodeAllDto criminalCodeDto)
        {
            await _service.UpdateCriminalCode(int.Parse(User.Identity.Name), id, criminalCodeDto);
            return Ok();
        }
    }
}
