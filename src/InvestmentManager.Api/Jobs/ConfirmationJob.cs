using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using InvestmentManager.Api.Data;
using InvestmentManager.Api.Services;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace InvestmentManager.Api.Jobs
{
    public class ConfirmationJob : IHostedService, IDisposable
    {
        private Timer _timer;
        private readonly IServiceProvider _serviceProvider;

        public ConfirmationJob(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _timer = new Timer(async (state) => await DoWork(state), null, TimeSpan.Zero, TimeSpan.FromDays(30));
            return Task.CompletedTask;
        }

        private async Task DoWork(object state)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                var confirmationService = scope.ServiceProvider.GetRequiredService<IConfirmationService>();
                var users = context.Users.ToList();

                foreach (var user in users)
                {
                    await confirmationService.CreateAndSendConfirmationAsync(user.Id);
                }
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}
