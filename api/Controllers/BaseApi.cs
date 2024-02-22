using System.Security.Claims;
using api.Data;
using api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApi : ControllerBase
    {
        public async Task<User> GetCredentials(DataContext context)
        {
            var tokenEmail = User.FindFirst(ClaimTypes.Name)?.Value;
            var user = await context.Users.FirstOrDefaultAsync(x => x.Email == tokenEmail);

            return user;
        }
    }
}