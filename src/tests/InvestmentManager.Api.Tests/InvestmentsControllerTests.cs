using InvestmentManager.Api.Controllers;
using InvestmentManager.Api.Data;
using InvestmentManager.Api.Dtos;
using InvestmentManager.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace InvestmentManager.Api.Tests;

public class InvestmentsControllerTests
{
    [Fact]
    public async Task PostInvestment_CreatesInvestmentWithCategories()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb")
            .Options;

        using (var context = new ApplicationDbContext(options))
        {
            context.Categories.Add(new Category { Id = 1, Name = "Stocks" });
            context.SaveChanges();
        }

        using (var context = new ApplicationDbContext(options))
        {
            var controller = new InvestmentsController(context);
            var createInvestmentDto = new CreateInvestmentDto
            {
                Name = "Test Investment",
                InitialValue = 1000,
                InvestmentDate = DateTime.Now,
                CategoryIds = new List<int> { 1 }
            };

            // Act
            var result = await controller.PostInvestment(createInvestmentDto);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var investmentDto = Assert.IsType<InvestmentDto>(createdAtActionResult.Value);
            Assert.Equal("Test Investment", investmentDto.Name);
            Assert.Single(investmentDto.Categories);
            Assert.Equal("Stocks", investmentDto.Categories.First().Name);
        }
    }

    [Fact]
    public async Task GetInvestments_ReturnsAllInvestmentsWithCategories()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb_Get")
            .Options;

        using (var context = new ApplicationDbContext(options))
        {
            var category = new Category { Id = 2, Name = "Real Estate" };
            context.Categories.Add(category);
            context.Investments.Add(new Investment
            {
                Id = 2,
                Name = "Test Investment 2",
                InitialValue = 2000,
                CurrentValue = 2100,
                InvestmentDate = DateTime.Now,
                Categories = new List<Category> { category }
            });
            context.SaveChanges();
        }

        using (var context = new ApplicationDbContext(options))
        {
            var controller = new InvestmentsController(context);

            // Act
            var result = await controller.GetInvestments();

            // Assert
            var okObjectResult = Assert.IsType<OkObjectResult>(result.Result);
            var investments = Assert.IsAssignableFrom<IEnumerable<InvestmentDto>>(okObjectResult.Value);
            var investment = investments.Single();
            Assert.Equal("Test Investment 2", investment.Name);
            Assert.Single(investment.Categories);
            Assert.Equal("Real Estate", investment.Categories.First().Name);
        }
    }
}
