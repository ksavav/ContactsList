namespace api.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Role { get; set; }
        public string SpecificRole { get; set; } // tu pewnie powinien być enum
        public int Phone { get; set; }
        public DateOnly Birthday { get; set; }
    }
}