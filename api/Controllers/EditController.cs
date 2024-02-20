using AutoMapper;
using api.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;

namespace api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class EditController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public EditController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(UpdateContactDto updatedUser)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == updatedUser.Email);

            if (user == null)
            {
                return BadRequest("Something went wrong");
            }

            if (updatedUser.NewEmail != null)
            {
                if (await _context.Users.FirstOrDefaultAsync(x => x.Email == updatedUser.NewEmail) != null)
                {
                    return BadRequest("This email is already used");
                }

                user.Email = updatedUser.NewEmail;
            }

            user.Name = updatedUser.Name;
            user.Lastname = updatedUser.Lastname;
            user.Phone = updatedUser.Phone;
            //user.Role = updatedUser.Role;
            //ser.SpecificRole = updatedUser.SpecificRole;

            await _context.SaveChangesAsync();

            return Ok("Changes have been saved");
        }

        [HttpDelete("delete-user/{email}")]
        public async Task<ActionResult> DeleteUser(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);

            if (user == null)
            {
                return BadRequest("No user with given email");
            }

            _context.Users.Remove(user);

            await _context.SaveChangesAsync();
            
            return Ok("User has been removed");
        }
    }
}