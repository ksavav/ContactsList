using System.Security.Cryptography;
using System.Text;
using api.Data;
using api.DTO;
using api.Entities;
using api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly TokenService _token;
        private readonly IMapper _mapper;
        public AccountController(DataContext context, TokenService token, IMapper mapper)
        {
            _mapper = mapper;
            _token = token;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto new_user) // userDTO
        {
            if (await _context.Users.AnyAsync(x => x.Email.ToLower() == new_user.Email))
            {
                return BadRequest("User with this email already exist");
            }

            var user = _mapper.Map<User>(new_user);
            
            using var hash = new HMACSHA512();

            user.PasswordHash = hash.ComputeHash(Encoding.UTF8.GetBytes(new_user.Password));
            user.PasswordSalt = hash.Key;

            user.Name = new_user.Name.ToLower();
            user.Surname = new_user.Surname.ToLower();
            
            _context.Users.Add(user);

            await _context.SaveChangesAsync();

            return Ok(new UserDto
            {
                Name = user.Name,
                Surname = user.Surname,
                Phone = user.Phone,
                Email = user.Email,
                Role = user.Role,
                SpecificRole = user.SpecificRole,
                Token = _token.CreateToken(user)
            });
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto login)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == login.Email);

            if (user == null)
            {
                return BadRequest("There is not user with given email");
            }

            using var hash = new HMACSHA512(user.PasswordSalt);

            var login_hash = hash.ComputeHash(Encoding.UTF8.GetBytes(login.Password));

            for(int i = 0; i < login_hash.Length; i++)
            {
                if(login_hash[i] != user.PasswordHash[i])
                {
                    return Unauthorized("Password does not match");
                }
            }

            return Ok(new UserDto 
            {
                Name = user.Name,
                Surname = user.Surname,
                Phone = user.Phone,
                Email = user.Email,
                Role = user.Role,
                SpecificRole = user.SpecificRole,
                Token = _token.CreateToken(user)
            });
        }
    }
}