using InvestmentManager.Api.Data;
using InvestmentManager.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InvestmentManager.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InvestmentsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public InvestmentsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Investment>>> GetInvestments()
    {
        return await _context.Investments.Include(i => i.Categories).ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Investment>> PostInvestment(Investment investment)
    {
        investment.CurrentValue = investment.InitialValue;

        if (investment.Categories != null && investment.Categories.Any())
        {
            var categoryIds = investment.Categories.Select(c => c.Id).ToList();
            var categoriesFromDb = await _context.Categories.Where(c => categoryIds.Contains(c.Id)).ToListAsync();
            investment.Categories = categoriesFromDb;
        }

        _context.Investments.Add(investment);
        await _context.SaveChangesAsync();

        var newInvestment = await _context.Investments
            .Include(i => i.Categories)
            .FirstOrDefaultAsync(i => i.Id == investment.Id);

        return CreatedAtAction(nameof(GetInvestments), new { id = newInvestment.Id }, newInvestment);
    }
}
