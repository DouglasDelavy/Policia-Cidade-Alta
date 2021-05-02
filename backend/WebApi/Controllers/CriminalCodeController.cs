using Api.Services.AppServices;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("code")]
    public class CriminalCodeController : ControllerBase
    {
        private CriminalCodeService _service;
        public CriminalCodeController(CriminalCodeService service)
        {
            _service = service;
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllCriminalCodes([FromQuery] string filter = null, [FromQuery] int page = 0)
        {
            return Ok(await _service.GetCriminalCode(filter,page));
        }

        [HttpDelete("")]
        public async Task<IActionResult> DeleteCriminalCode([FromQuery] int id)
        {
            await _service.DeleteCriminalCode(id);
            return Ok();
        }
    }
}
