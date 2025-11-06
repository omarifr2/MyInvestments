using InvestmentManager.Api.Data;
using InvestmentManager.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace InvestmentManager.Api.Services
{
    public class ConfirmationService : IConfirmationService
    {
        private readonly ApplicationDbContext _context;
        private readonly INotificationService _notificationService;
        private readonly IConfiguration _configuration;

        public ConfirmationService(ApplicationDbContext context, INotificationService notificationService, IConfiguration configuration)
        {
            _context = context;
            _notificationService = notificationService;
            _configuration = configuration;
        }

        public async Task CreateAndSendConfirmationAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                throw new ArgumentException("User not found.");
            }

            var token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
            var confirmation = new Confirmation
            {
                Token = token,
                ExpirationDate = DateTime.UtcNow.AddDays(7),
                IsConfirmed = false,
                UserId = userId
            };

            _context.Confirmations.Add(confirmation);
            await _context.SaveChangesAsync();

            var baseUrl = _configuration["App:BaseUrl"];
            var confirmationLink = $"{baseUrl}/api/confirmation/{token}";
            if (!string.IsNullOrEmpty(user.Email))
            {
                await _notificationService.SendConfirmationEmailAsync(user.Email, confirmationLink);
            }
            if (!string.IsNullOrEmpty(user.PhoneNumber))
            {
                await _notificationService.SendConfirmationWhatsAppAsync(user.PhoneNumber, confirmationLink);
            }
        }
    }
}
