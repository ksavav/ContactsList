using api.Data;
using api.DTO;
using api.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UsersController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();

            return Ok(_mapper.Map<IEnumerable<UserDto>>(users));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUserById(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return BadRequest("No user with given id");
            }

            return Ok(_mapper.Map<UserDto>(user));
        }

        [HttpGet("email/{email}")]
        public async Task<ActionResult<UserDto>> GetUserByEmail(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);

            if (user == null)
            {
                return BadRequest("No user with given email");
            }

            return Ok(_mapper.Map<UserDto>(user));
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(UpdateDto updatedUser)
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
            user.Surname = updatedUser.Surname;
            user.Phone = updatedUser.Phone;
            user.Role = updatedUser.Role;
            user.SpecificRole = updatedUser.SpecificRole;

            await _context.SaveChangesAsync();

            return Ok("Changes have been saved");
        }
    }
}