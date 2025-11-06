using InvestmentManager.Api.Data;
using InvestmentManager.Api.Jobs;
using InvestmentManager.Api.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddScoped<INotificationService, NotificationService>();
builder.Services.AddScoped<IConfirmationService, ConfirmationService>();
builder.Services.AddHostedService<ConfirmationJob>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    // Seed the database
    using (var scope = app.Services.CreateScope())
    {
        var services = scope.ServiceProvider;
        var context = services.GetRequiredService<ApplicationDbContext>();
        DataSeeder.Seed(context);
    }
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
