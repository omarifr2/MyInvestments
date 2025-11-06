using System;
using System.Threading.Tasks;

namespace InvestmentManager.Api.Services
{
    // TODO: Replace with a real email service
    public class NotificationService : INotificationService
    {
        public Task SendConfirmationEmailAsync(string email, string confirmationLink)
        {
            Console.WriteLine($"Sending confirmation email to {email} with link: {confirmationLink}");
            return Task.CompletedTask;
        }

        // TODO: Replace with a real WhatsApp service
        public Task SendConfirmationWhatsAppAsync(string phoneNumber, string confirmationLink)
        {
            Console.WriteLine($"Sending confirmation WhatsApp to {phoneNumber} with link: {confirmationLink}");
            return Task.CompletedTask;
        }
    }
}
