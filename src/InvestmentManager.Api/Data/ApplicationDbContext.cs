using InvestmentManager.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace InvestmentManager.Api.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Investment> Investments { get; set; }
    public DbSet<Category> Categories { get; set; }
}
