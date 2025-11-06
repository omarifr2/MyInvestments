using InvestmentManager.Api.Data;
using InvestmentManager.Api.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace InvestmentManager.Api.Services;

public class ReportService : IReportService
{
    private readonly ApplicationDbContext _context;

    public ReportService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<string> GenerateReportAsync()
    {
        var investments = await _context.Investments
            .Select(i => new { i.Name, i.CurrentValue })
            .ToListAsync();

        var totalValue = investments.Sum(i => i.CurrentValue);

        var reportContent = new
        {
            Investments = investments,
            TotalValue = totalValue,
            GeneratedAt = DateTime.UtcNow
        };

        var report = new Report
        {
            Content = JsonSerializer.Serialize(reportContent),
            Token = Guid.NewGuid().ToString(),
            CreatedAt = DateTime.UtcNow,
            ExpiresAt = DateTime.UtcNow.AddMinutes(10)
        };

        _context.Reports.Add(report);
        await _context.SaveChangesAsync();

        return $"/api/reports/{report.Token}";
    }

    public async Task<string?> GetReportAndSelfDestructAsync(string token)
    {
        var report = await _context.Reports.FirstOrDefaultAsync(r => r.Token == token);

        if (report == null || report.ExpiresAt < DateTime.UtcNow)
        {
            return null;
        }

        var reportContent = report.Content;

        _context.Reports.Remove(report);
        await _context.SaveChangesAsync();

        return reportContent;
    }
}
