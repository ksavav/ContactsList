using System.ComponentModel.DataAnnotations;

namespace api.Entities
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public int Phone { get; set; }
        public List<Contact> UserContacts { get; set; } = new List<Contact>();
    }
}