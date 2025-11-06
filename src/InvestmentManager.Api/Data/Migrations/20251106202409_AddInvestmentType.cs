using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InvestmentManager.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddInvestmentType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "InvestmentType",
                table: "Investments",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InvestmentType",
                table: "Investments");
        }
    }
}
