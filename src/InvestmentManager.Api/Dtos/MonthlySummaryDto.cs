namespace InvestmentManager.Api.Dtos
{
    public class MonthlySummaryDto
    {
        public decimal Total { get; set; }
        public List<CategorySummaryDto> CategorySummary { get; set; }
        public decimal PreviousMonthTotal { get; set; }
    }

    public class CategorySummaryDto
    {
        public string Category { get; set; }
        public decimal Total { get; set; }
    }
}
