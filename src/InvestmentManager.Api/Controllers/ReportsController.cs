using InvestmentManager.Api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace InvestmentManager.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReportsController : ControllerBase
{
    private readonly IReportService _reportService;

    public ReportsController(IReportService reportService)
    {
        _reportService = reportService;
    }

    [HttpPost("generate")]
    public async Task<IActionResult> GenerateReport()
    {
        var reportUrl = await _reportService.GenerateReportAsync();
        return Ok(new { url = reportUrl });
    }

    [HttpGet("{token}")]
    public async Task<IActionResult> GetReport(string token)
    {
        var reportContent = await _reportService.GetReportAndSelfDestructAsync(token);
        if (reportContent == null)
        {
            return NotFound();
        }
        return Content(reportContent, "application/json");
    }
}
