namespace InvestmentManager.Api.Models;

public class Investment
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public ICollection<Category> Categories { get; set; } = new List<Category>();
}
