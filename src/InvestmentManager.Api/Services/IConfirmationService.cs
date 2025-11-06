using System.Threading.Tasks;

namespace InvestmentManager.Api.Services
{
    public interface IConfirmationService
    {
        Task CreateAndSendConfirmationAsync(int userId);
    }
}
