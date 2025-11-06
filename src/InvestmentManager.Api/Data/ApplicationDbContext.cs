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
    public DbSet<InvestmentTransaction> InvestmentTransactions { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Confirmation> Confirmations { get; set; }
    public DbSet<Report> Reports { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Investment>()
            .HasMany(i => i.Categories)
            .WithMany(c => c.Investments)
            .UsingEntity(j => j.ToTable("InvestmentCategory"));
    }
}
