using System.ComponentModel.DataAnnotations.Schema;

namespace InvestmentManager.Api.Models;

public class InvestmentTransaction
{
    public int Id { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal Amount { get; set; }
    public DateTime TransactionDate { get; set; }
    public string? TransactionType { get; set; } // "Deposit" or "Withdrawal"

    public int InvestmentId { get; set; }
    public Investment? Investment { get; set; }
}
