using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InvestmentManager.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class RenameCategoryInvestmentTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "CategoryInvestment",
                newName: "InvestmentCategory");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "InvestmentCategory",
                newName: "CategoryInvestment");
        }
    }
}
