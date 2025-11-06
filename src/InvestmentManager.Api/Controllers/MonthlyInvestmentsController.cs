using InvestmentManager.Api.Data;
using InvestmentManager.Api.Dtos;
using InvestmentManager.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InvestmentManager.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MonthlyInvestmentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MonthlyInvestmentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> PostMonthlyInvestments(List<InvestmentTransaction> transactions)
        {
            foreach (var transaction in transactions)
            {
                _context.InvestmentTransactions.Add(transaction);
            }
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("summary")]
        public async Task<ActionResult<MonthlySummaryDto>> GetMonthlySummary(int year, int month)
        {
            var total = await _context.InvestmentTransactions
                .Where(t => t.TransactionDate.Year == year && t.TransactionDate.Month == month)
                .SumAsync(t => t.Amount);

            var categorySummary = await _context.InvestmentTransactions
                .Where(t => t.TransactionDate.Year == year && t.TransactionDate.Month == month)
                .Include(t => t.Investment)
                .ThenInclude(i => i.Categories)
                .GroupBy(t => t.Investment.Categories.FirstOrDefault() != null ? t.Investment.Categories.FirstOrDefault().Name : "Uncategorized")
                .Select(g => new CategorySummaryDto { Category = g.Key, Total = g.Sum(t => t.Amount) })
                .ToListAsync();

            var previousMonthDate = new DateTime(year, month, 1).AddMonths(-1);
            var previousMonthTotal = await _context.InvestmentTransactions
                .Where(t => t.TransactionDate.Year == previousMonthDate.Year && t.TransactionDate.Month == previousMonthDate.Month)
                .SumAsync(t => t.Amount);

            var summary = new MonthlySummaryDto
            {
                Total = total,
                CategorySummary = categorySummary,
                PreviousMonthTotal = previousMonthTotal
            };

            return Ok(summary);
        }
    }
}
