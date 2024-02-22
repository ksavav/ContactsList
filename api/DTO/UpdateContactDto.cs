namespace api.DTO
{
    public class UpdateContactDto
    {
        public string Name { get; set; }
        public string Lastname { get; set; }
        public int Phone { get; set; }
        public string Email { get; set; }
        public string NewEmail { get; set; }
        public string Role { get; set; }
        public string SpecificRole { get; set; }
    }
}