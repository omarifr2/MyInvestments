namespace InvestmentManager.Api.Models;

using System.ComponentModel.DataAnnotations.Schema;

public class Investment
{
    public int Id { get; set; }
    public string? Name { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal InitialValue { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal CurrentValue { get; set; }
    public DateTime InvestmentDate { get; set; }
    public ICollection<Category> Categories { get; set; } = new List<Category>();
}
