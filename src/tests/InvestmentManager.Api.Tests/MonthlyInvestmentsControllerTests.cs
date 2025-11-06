using InvestmentManager.Api.Controllers;
using InvestmentManager.Api.Data;
using InvestmentManager.Api.Dtos;
using InvestmentManager.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace InvestmentManager.Api.Tests;

public class MonthlyInvestmentsControllerTests
{
    [Fact]
    public async Task PostMonthlyInvestments_AddsTransactionsToDatabase()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb_PostMonthlyInvestments")
            .Options;

        var investment = new Investment { Id = 1, Name = "Test Investment", InitialValue = 1000, CurrentValue = 1000, InvestmentDate = DateTime.UtcNow };

        using (var context = new ApplicationDbContext(options))
        {
            context.Investments.Add(investment);
            await context.SaveChangesAsync();
        }

        using (var context = new ApplicationDbContext(options))
        {
            var controller = new MonthlyInvestmentsController(context);
            var transactions = new List<InvestmentTransaction>
            {
                new InvestmentTransaction { InvestmentId = 1, Amount = 100, TransactionDate = DateTime.UtcNow },
                new InvestmentTransaction { InvestmentId = 1, Amount = 200, TransactionDate = DateTime.UtcNow }
            };

            // Act
            var result = await controller.PostMonthlyInvestments(transactions);

            // Assert
            Assert.IsType<OkResult>(result);
            Assert.Equal(2, await context.InvestmentTransactions.CountAsync());
        }
    }

    [Fact]
    public async Task GetMonthlySummary_ReturnsCorrectSummary()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb_GetMonthlySummary")
            .Options;

        var category1 = new Category { Id = 1, Name = "Stocks" };
        var category2 = new Category { Id = 2, Name = "Bonds" };
        var investment1 = new Investment { Id = 1, Name = "Stock Investment", InitialValue = 1000, CurrentValue = 1000, InvestmentDate = DateTime.UtcNow, Categories = new List<Category> { category1 } };
        var investment2 = new Investment { Id = 2, Name = "Bond Investment", InitialValue = 500, CurrentValue = 500, InvestmentDate = DateTime.UtcNow, Categories = new List<Category> { category2 } };

        using (var context = new ApplicationDbContext(options))
        {
            context.Categories.AddRange(category1, category2);
            context.Investments.AddRange(investment1, investment2);
            context.InvestmentTransactions.AddRange(
                new InvestmentTransaction { InvestmentId = 1, Amount = 100, TransactionDate = new DateTime(2024, 5, 10) }, // Current month
                new InvestmentTransaction { InvestmentId = 2, Amount = 200, TransactionDate = new DateTime(2024, 5, 15) }, // Current month
                new InvestmentTransaction { InvestmentId = 1, Amount = 50, TransactionDate = new DateTime(2024, 4, 10) },  // Previous month
                new InvestmentTransaction { InvestmentId = 2, Amount = 75, TransactionDate = new DateTime(2024, 4, 15) }   // Previous month
            );
            await context.SaveChangesAsync();
        }

        using (var context = new ApplicationDbContext(options))
        {
            var controller = new MonthlyInvestmentsController(context);

            // Act
            var result = await controller.GetMonthlySummary(2024, 5);

            // Assert
            var okObjectResult = Assert.IsType<OkObjectResult>(result.Result);
            var summary = Assert.IsType<MonthlySummaryDto>(okObjectResult.Value);

            Assert.Equal(300m, summary.Total);
            Assert.Equal(125m, summary.PreviousMonthTotal);

            Assert.Equal(2, summary.CategorySummary.Count);

            var stockSummary = summary.CategorySummary.First(s => s.Category == "Stocks");
            Assert.Equal(100m, stockSummary.Total);

            var bondSummary = summary.CategorySummary.First(s => s.Category == "Bonds");
            Assert.Equal(200m, bondSummary.Total);
        }
    }
}
