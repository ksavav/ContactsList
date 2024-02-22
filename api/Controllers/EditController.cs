using AutoMapper;
using api.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;

namespace api.Controllers
{
    [Authorize]
    public class EditController : BaseApi
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public EditController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        [HttpPut]
        public async Task<ActionResult> UpdateUser(UpdateContactDto updatedUser) // zmiana na contact
        {
            var user = await GetCredentials(_context);
            var contact = await _context.Contacts.FirstOrDefaultAsync(x => x.Email == updatedUser.Email);

            if (user == null || contact == null)
            {
                return BadRequest("Something went wrong");
            }

            if (contact.UserId != user.Id)
            {
                return BadRequest("You can edit only your contacts!");
            }

            if (updatedUser.NewEmail != null)
            {
                if (await _context.Contacts.FirstOrDefaultAsync(x => x.Email == updatedUser.NewEmail) != null)
                {
                    return BadRequest("This email is already used");
                }

                contact.Email = updatedUser.NewEmail;
            }

            contact.Name = updatedUser.Name;
            contact.Lastname = updatedUser.Lastname;
            contact.Phone = updatedUser.Phone;
            contact.Role = updatedUser.Role;
            contact.SpecificRole = updatedUser.SpecificRole;

            await _context.SaveChangesAsync();

            return Ok("Changes have been saved");
        }

        [HttpDelete("delete-user/{email}")]
        public async Task<ActionResult> DeleteUser(string email) // zmiana na contact
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