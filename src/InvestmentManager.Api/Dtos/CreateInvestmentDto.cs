namespace InvestmentManager.Api.Dtos;

public class CreateInvestmentDto
{
    public string? Name { get; set; }
    public decimal InitialValue { get; set; }
    public DateTime InvestmentDate { get; set; }
    public ICollection<int>? CategoryIds { get; set; }
}
