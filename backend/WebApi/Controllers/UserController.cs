using Api.Authenticate;
using Api.Dtos;
using Api.Services.AppServices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("user")]
    public class UserController : ControllerBase
    {
        public IConfiguration Configuration { get; }
        private UserApplicationService _appService;
        public UserController(IConfiguration configuration, UserApplicationService appService)
        {
            _appService = appService;
            Configuration = configuration;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateUser([FromBody] UserDto userDto)
        {
            return Ok(await _appService.CreateUser(userDto));
        }

        [HttpPost("")]
        public async Task<IActionResult> Login([FromBody] UserDto userDto)
        {
            var user = await _appService.CheckUser(userDto);
            var token = AuthService.GenerateToken(user, Configuration["Key"]);
            user.Password = "";

            return Ok(new
            {
                token,
                user,
            });
        }
    }
}
