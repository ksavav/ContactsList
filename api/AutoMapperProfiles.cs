using api.DTO;
using api.Entities;
using AutoMapper;

namespace api
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<RegisterDto, User>();
            CreateMap<User, LoginDto>();
            CreateMap<User, UserDto>();
            CreateMap<ContactDto, Contact>();
            CreateMap<Contact, ContactDto>();
        }
    }
}