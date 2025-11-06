using System;
using System.ComponentModel.DataAnnotations;

namespace InvestmentManager.Api.Models;

public class Report
{
    public Guid Id { get; set; }
    [Required]
    public string? Content { get; set; }
    [Required]
    public string? Token { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime ExpiresAt { get; set; }
}
