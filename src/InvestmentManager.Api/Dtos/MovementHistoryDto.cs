namespace InvestmentManager.Api.Dtos;

public class MovementHistoryDto
{
    public int Id { get; set; }
    public string? InvestmentName { get; set; }
    public decimal Amount { get; set; }
    public DateTime TransactionDate { get; set; }
    public string? TransactionType { get; set; }
}
