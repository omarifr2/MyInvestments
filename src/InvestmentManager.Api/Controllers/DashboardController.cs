using InvestmentManager.Api.Data;
using InvestmentManager.Api.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InvestmentManager.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public DashboardController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("earnings/monthly")]
    public async Task<ActionResult<IEnumerable<EarningsSummaryDto>>> GetMonthlyEarnings()
    {
        var monthlyEarnings = await _context.Investments
            .GroupBy(i => new { i.InvestmentDate.Year, i.InvestmentDate.Month })
            .Select(g => new EarningsSummaryDto
            {
                Period = $"{g.Key.Year}-{g.Key.Month}",
                TotalEarnings = g.Sum(i => i.CurrentValue - i.InitialValue)
            })
            .OrderBy(e => e.Period)
            .ToListAsync();

        return Ok(monthlyEarnings);
    }

    [HttpGet("earnings/yearly")]
    public async Task<ActionResult<IEnumerable<EarningsSummaryDto>>> GetYearlyEarnings()
    {
        var yearlyEarnings = await _context.Investments
            .GroupBy(i => i.InvestmentDate.Year)
            .Select(g => new EarningsSummaryDto
            {
                Period = g.Key.ToString(),
                TotalEarnings = g.Sum(i => i.CurrentValue - i.InitialValue)
            })
            .OrderBy(e => e.Period)
            .ToListAsync();

        return Ok(yearlyEarnings);
    }

    [HttpGet("investments/by-category")]
    public async Task<ActionResult<IEnumerable<CategoryInvestmentDto>>> GetInvestmentsByCategory([FromQuery] int? year, [FromQuery] int? month)
    {
        var query = _context.Investments.AsQueryable();

        if (year.HasValue)
        {
            query = query.Where(i => i.InvestmentDate.Year == year.Value);
        }

        if (month.HasValue)
        {
            query = query.Where(i => i.InvestmentDate.Month == month.Value);
        }

        var investmentsByCategory = await query
            .SelectMany(i => i.Categories.Select(c => new { Investment = i, Category = c }))
            .GroupBy(ic => ic.Category.Name)
            .Select(g => new CategoryInvestmentDto
            {
                Category = g.Key,
                TotalInvested = g.Sum(ic => ic.Investment.InitialValue)
            })
            .ToListAsync();

        return Ok(investmentsByCategory);
    }

    [HttpGet("earnings/percentage/monthly")]
    public async Task<ActionResult<IEnumerable<EarningsPercentageDto>>> GetMonthlyEarningsPercentage()
    {
        var monthlyPercentages = await _context.Investments
            .GroupBy(i => new { i.InvestmentDate.Year, i.InvestmentDate.Month })
            .Select(g => new
            {
                Period = $"{g.Key.Year}-{g.Key.Month}",
                TotalInitial = g.Sum(i => i.InitialValue),
                TotalCurrent = g.Sum(i => i.CurrentValue)
            })
            .Select(g => new EarningsPercentageDto
            {
                Period = g.Period,
                Percentage = g.TotalInitial == 0 ? 0 : (g.TotalCurrent - g.TotalInitial) / g.TotalInitial * 100
            })
            .OrderBy(e => e.Period)
            .ToListAsync();

        return Ok(monthlyPercentages);
    }

    [HttpGet("earnings/percentage/yearly")]
    public async Task<ActionResult<IEnumerable<EarningsPercentageDto>>> GetYearlyEarningsPercentage()
    {
        var yearlyPercentages = await _context.Investments
            .GroupBy(i => i.InvestmentDate.Year)
            .Select(g => new
            {
                Period = g.Key.ToString(),
                TotalInitial = g.Sum(i => i.InitialValue),
                TotalCurrent = g.Sum(i => i.CurrentValue)
            })
            .Select(g => new EarningsPercentageDto
            {
                Period = g.Period,
                Percentage = g.TotalInitial == 0 ? 0 : (g.TotalCurrent - g.TotalInitial) / g.TotalInitial * 100
            })
            .OrderBy(e => e.Period)
            .ToListAsync();

        return Ok(yearlyPercentages);
    }

    [HttpGet("movements")]
    public async Task<ActionResult<IEnumerable<MovementHistoryDto>>> GetMovementHistory()
    {
        var movementHistory = await _context.InvestmentTransactions
            .Include(t => t.Investment)
            .Select(t => new MovementHistoryDto
            {
                Id = t.Id,
                InvestmentName = t.Investment.Name,
                Amount = t.Amount,
                TransactionDate = t.TransactionDate,
                TransactionType = t.TransactionType
            })
            .OrderByDescending(t => t.TransactionDate)
            .ToListAsync();

        return Ok(movementHistory);
    }
}
