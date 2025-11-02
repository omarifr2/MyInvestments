using InvestmentManager.Api.Data;
using InvestmentManager.Api.Dtos;
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
    public async Task<ActionResult<IEnumerable<InvestmentDto>>> GetInvestments()
    {
        var investments = await _context.Investments
            .Include(i => i.Categories)
            .Select(i => new InvestmentDto
            {
                Id = i.Id,
                Name = i.Name,
                InitialValue = i.InitialValue,
                CurrentValue = i.CurrentValue,
                InvestmentDate = i.InvestmentDate,
                Categories = i.Categories.Select(c => new CategoryDto { Id = c.Id, Name = c.Name }).ToList()
            })
            .ToListAsync();

        return Ok(investments);
    }

    [HttpPost]
    public async Task<ActionResult<InvestmentDto>> PostInvestment(CreateInvestmentDto createInvestmentDto)
    {
        var investment = new Investment
        {
            Name = createInvestmentDto.Name,
            InitialValue = createInvestmentDto.InitialValue,
            InvestmentDate = createInvestmentDto.InvestmentDate,
            CurrentValue = createInvestmentDto.InitialValue
        };

        if (createInvestmentDto.CategoryIds != null && createInvestmentDto.CategoryIds.Any())
        {
            var categories = await _context.Categories
                .Where(c => createInvestmentDto.CategoryIds.Contains(c.Id))
                .ToListAsync();
            investment.Categories = categories;
        }

        _context.Investments.Add(investment);
        await _context.SaveChangesAsync();

        var investmentDto = new InvestmentDto
        {
            Id = investment.Id,
            Name = investment.Name,
            InitialValue = investment.InitialValue,
            CurrentValue = investment.CurrentValue,
            InvestmentDate = investment.InvestmentDate,
            Categories = investment.Categories.Select(c => new CategoryDto { Id = c.Id, Name = c.Name }).ToList()
        };

        return CreatedAtAction(nameof(GetInvestments), new { id = investment.Id }, investmentDto);
    }
}
