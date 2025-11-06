using InvestmentManager.Api.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace InvestmentManager.Api.Data;

public static class DataSeeder
{
    public static void Seed(ApplicationDbContext context)
    {
        // Clean existing data
        if (context.InvestmentTransactions.Any())
        {
            context.InvestmentTransactions.RemoveRange(context.InvestmentTransactions);
        }
        if (context.Investments.Any())
        {
            context.Investments.RemoveRange(context.Investments);
        }
        if (context.Categories.Any())
        {
            context.Categories.RemoveRange(context.Categories);
        }
        context.SaveChanges();

        // Seed Categories
        var stockCategory = new Category { Name = "Stocks" };
        var realEstateCategory = new Category { Name = "Real Estate" };
        var cryptoCategory = new Category { Name = "Crypto" };

        context.Categories.AddRange(stockCategory, realEstateCategory, cryptoCategory);
        context.SaveChanges();

        // Seed Investments
        var appleInvestment = new Investment
        {
            Name = "Apple Inc.",
            InvestmentType = "Stock",
            InitialValue = 15000,
            CurrentValue = 15500,
            InvestmentDate = new DateTime(2023, 5, 10),
            Categories = new List<Category> { stockCategory }
        };

        var apartmentInvestment = new Investment
        {
            Name = "Downtown Apartment",
            InvestmentType = "Real Estate",
            InitialValue = 250000,
            CurrentValue = 275000,
            InvestmentDate = new DateTime(2022, 8, 15),
            Categories = new List<Category> { realEstateCategory }
        };

        var bitcoinInvestment = new Investment
        {
            Name = "Bitcoin",
            InvestmentType = "Cryptocurrency",
            InitialValue = 10000,
            CurrentValue = 45000,
            InvestmentDate = new DateTime(2021, 1, 1),
            Categories = new List<Category> { cryptoCategory }
        };

        context.Investments.AddRange(appleInvestment, apartmentInvestment, bitcoinInvestment);
        context.SaveChanges();

        // Seed Investment Transactions
        var appleDeposit = new InvestmentTransaction
        {
            InvestmentId = appleInvestment.Id,
            TransactionType = "Deposit",
            Amount = 500,
            TransactionDate = new DateTime(2023, 6, 1)
        };

        var appleWithdrawal = new InvestmentTransaction
        {
            InvestmentId = appleInvestment.Id,
            TransactionType = "Withdrawal",
            Amount = 200,
            TransactionDate = new DateTime(2023, 7, 1)
        };

        context.InvestmentTransactions.AddRange(appleDeposit, appleWithdrawal);
        context.SaveChanges();
    }
}
