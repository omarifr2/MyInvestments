# MyInvestments

MyInvestments is a web application designed to manage and monitor your investments. This application is built using a modern technology stack, with a .NET 9 Web API for the backend and a React.js frontend.

## Features

### Investment Management
- **Add Investments:** Register new investments with a name and assign them to one or more categories.
- **Track Monthly Investments:** Add the amount invested for each investment on a monthly basis.
- **View Investment Details:** See the total amount invested for each of your investments.
- **Money Movements:** Register movements of money between investments or withdrawals.
- **Investment Goal:** Establish a yearly investment goal and track your progress to achieve it.
- **Notes:** Keep notes on your investments.

### Reporting and Analytics
- **Monthly and Yearly Earnings:** View a summary of your total earnings by month and for the current year.
- **Category-Based Reporting:** See the total amount invested by category, broken down by month and year.
- **Earnings Percentage:** Track the earnings percentage for the current year.
- **Movement History:** View a list of all your investment movements.

### Secure and Temporary Reporting
- **Temporal Reports:** Generate a temporary report with a list of the total amount of money for every investment and any registered notes. This report will be available at a temporary URL.
- **Self-Destructing Reports:** The temporary URL and the report will be automatically removed a few minutes after the addressee opens it. This feature is designed to share classified information securely.
- **Permanent Reports for Contacts:** In the event of the user's death, a permanent report will be sent to designated contacts.

### "Still Alive" Confirmation
- **WhatsApp Confirmation:** The application will send a monthly WhatsApp message with a confirmation link to verify that the user is still alive.
- **Automatic Report Generation:** If the user does not confirm they are alive within 15 days of the current month (either by clicking the link in WhatsApp or by logging into the app), a permanent report will be sent to their designated contacts.

### Security
- **Google Authentication:** Access the application using your Google account.
- **Two-Factor Authentication (2FA):** Secure your account with two-factor authentication.

## Technical Details
- **Backend:** .NET 9 Web API
- **Frontend:** React.js
