using InvestmentManager.Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace InvestmentManager.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConfirmationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ConfirmationController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{token}")]
        public async Task<IActionResult> Confirm(string token)
        {
            if (string.IsNullOrEmpty(token))
            {
                return BadRequest("Token is required.");
            }

            var confirmation = await _context.Confirmations
                .FirstOrDefaultAsync(c => c.Token == token);

            if (confirmation == null)
            {
                return NotFound("Confirmation token not found.");
            }

            if (confirmation.IsConfirmed)
            {
                return BadRequest("This confirmation has already been used.");
            }

            if (confirmation.ExpirationDate < DateTime.UtcNow)
            {
                return BadRequest("Confirmation token has expired.");
            }

            confirmation.IsConfirmed = true;
            await _context.SaveChangesAsync();

            return Ok("Confirmation successful.");
        }
    }
}
