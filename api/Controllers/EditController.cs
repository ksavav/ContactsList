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
        public async Task<ActionResult> UpdateUser(UpdateContactDto updatedContact) // zmiana na contact
        {
            var user = await GetCredentials(_context);
            var contact = await _context.Contacts.FirstOrDefaultAsync(x => x.Email == updatedContact.Email);

            if (user == null || contact == null)
            {
                return BadRequest("Something went wrong");
            }

            if (contact.UserId != user.Id)
            {
                return BadRequest("You can edit only your contacts!");
            }

            if (updatedContact.NewEmail != null && updatedContact.NewEmail != updatedContact.Email)
            {
                if (await _context.Contacts.FirstOrDefaultAsync(x => x.Email == updatedContact.NewEmail) != null)
                {
                    return BadRequest("This email is already used");
                }

                contact.Email = updatedContact.NewEmail;
            }

            contact.Name = updatedContact.Name;
            contact.Lastname = updatedContact.Lastname;
            contact.Phone = updatedContact.Phone;
            contact.Role = updatedContact.Role;
            contact.SpecificRole = updatedContact.SpecificRole;

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