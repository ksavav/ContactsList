using System.Security.Claims;
using api.Data;
using api.DTO;
using api.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ContactsController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [Authorize]
        [HttpPost("add-contact")]
        public async Task<ActionResult<ContactDto>> AddContact(ContactDto newContact)
        {
            var tokenEmail = User.FindFirst(ClaimTypes.Name)?.Value;
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == tokenEmail);

            if (user == null)
            {
                return NotFound();
            }

            if (await _context.Contacts.AnyAsync(
                x => x.Email.ToLower() == newContact.Email && x.UserId == user.Id))
            {
                return BadRequest("You already have contact with this email");
            }

            var contact = _mapper.Map<Contact>(newContact);

            contact.Name = newContact.Name.ToLower();
            contact.Lastname = newContact.Lastname.ToLower();

            user.UserContacts.Add(contact);

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ContactDto>> GetContact(int id)
        {
            var contact = await _context.Contacts.FirstOrDefaultAsync(x => x.Id == id);

            if (contact == null)
            {
                return BadRequest("No user with given email");
            }

            return Ok(_mapper.Map<ContactDto>(contact));
        }

        [HttpGet("email/{email}")]
        public async Task<ActionResult<ContactDto>> GetContact(string email)
        {
            var contact = await _context.Contacts.FirstOrDefaultAsync(x => x.Email == email);

            if (contact == null)
            {
                return BadRequest("No user with given email");
            }

            return Ok(_mapper.Map<ContactDto>(contact));
        }

        [HttpGet("for-user/{email}")]
        public async Task<ActionResult<IEnumerable<ContactDto>>> GetAllUserContacts(string email)
        {
            throw new NotImplementedException();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactDto>>> GetContacts()
        {
            var contacts = await _context.Contacts.ToListAsync();

            return Ok(_mapper.Map<IEnumerable<ContactDto>>(contacts));
        }
    }
}