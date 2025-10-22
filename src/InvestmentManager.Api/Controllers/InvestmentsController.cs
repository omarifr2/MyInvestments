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
        _context.Investments.Add(investment);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetInvestments), new { id = investment.Id }, investment);
    }
}
