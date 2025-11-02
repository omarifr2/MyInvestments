namespace InvestmentManager.Api.Dtos;

public class InvestmentDto
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public decimal InitialValue { get; set; }
    public decimal CurrentValue { get; set; }
    public DateTime InvestmentDate { get; set; }
    public ICollection<CategoryDto> Categories { get; set; } = new List<CategoryDto>();
}
