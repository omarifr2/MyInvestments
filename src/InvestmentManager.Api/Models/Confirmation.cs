namespace InvestmentManager.Api.Models;

public class Confirmation
{
    public int Id { get; set; }
    public string? Token { get; set; }
    public DateTime ExpirationDate { get; set; }
    public bool IsConfirmed { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
}
