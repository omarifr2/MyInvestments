using System.Threading.Tasks;

namespace InvestmentManager.Api.Services;

public interface IReportService
{
    Task<string> GenerateReportAsync();
    Task<string?> GetReportAndSelfDestructAsync(string token);
}
