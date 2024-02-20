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
    public class ContactsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ContactsController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpPost("add-contact")]
        public async Task<ActionResult<ContactDto>> AddContact(ContactDto newContact)
        {
            if (await _context.Contacts.AnyAsync(x => x.Email.ToLower() == newContact.Email))
            {
                return BadRequest("You already have contact with this email");
            }

            var contact = _mapper.Map<Contact>(newContact);

            contact.Name = newContact.Name.ToLower();
            contact.Lastname = newContact.Lastname.ToLower();

            _context.Contacts.Add(contact);

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}