using System.Threading.Tasks;

namespace InvestmentManager.Api.Services
{
    public interface INotificationService
    {
        Task SendConfirmationEmailAsync(string email, string confirmationLink);
        Task SendConfirmationWhatsAppAsync(string phoneNumber, string confirmationLink);
    }
}
