import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    const [monthlyEarnings, setMonthlyEarnings] = useState([]);
    const [yearlyEarnings, setYearlyEarnings] = useState([]);
    const [investmentsByCategory, setInvestmentsByCategory] = useState([]);
    const [monthlyPercentage, setMonthlyPercentage] = useState([]);
    const [yearlyPercentage, setYearlyPercentage] = useState([]);
    const [movementHistory, setMovementHistory] = useState([]);

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const monthlyEarningsRes = await fetch('/api/dashboard/earnings/monthly');
                const monthlyEarningsData = await monthlyEarningsRes.json();
                setMonthlyEarnings(monthlyEarningsData);

                const yearlyEarningsRes = await fetch('/api/dashboard/earnings/yearly');
                const yearlyEarningsData = await yearlyEarningsRes.json();
                setYearlyEarnings(yearlyEarningsData);

                const monthlyPercentageRes = await fetch('/api/dashboard/earnings/percentage/monthly');
                const monthlyPercentageData = await monthlyPercentageRes.json();
                setMonthlyPercentage(monthlyPercentageData);

                const yearlyPercentageRes = await fetch('/api/dashboard/earnings/percentage/yearly');
                const yearlyPercentageData = await yearlyPercentageRes.json();
                setYearlyPercentage(yearlyPercentageData);

                const movementHistoryRes = await fetch('/api/dashboard/movements');
                const movementHistoryData = await movementHistoryRes.json();
                setMovementHistory(movementHistoryData);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchInvestmentsByCategory = async () => {
            try {
                const res = await fetch(`/api/dashboard/investments/by-category?year=${selectedYear}&month=${selectedMonth}`);
                const data = await res.json();
                setInvestmentsByCategory(data);
            } catch (error) {
                console.error("Error fetching investments by category:", error);
            }
        };

        fetchInvestmentsByCategory();
    }, [selectedYear, selectedMonth]);

    return (
        <div>
            <h1>Dashboard</h1>

            <section>
                <h2>Monthly Earnings</h2>
                <ul>
                    {monthlyEarnings.map((earning, index) => (
                        <li key={index}>{earning.period}: ${earning.totalEarnings.toFixed(2)}</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Yearly Earnings</h2>
                <ul>
                    {yearlyEarnings.map((earning, index) => (
                        <li key={index}>{earning.period}: ${earning.totalEarnings.toFixed(2)}</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Investments by Category</h2>
                <div>
                    <label>Year: </label>
                    <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                        {[...Array(10)].map((_, i) => (
                            <option key={i} value={new Date().getFullYear() - i}>
                                {new Date().getFullYear() - i}
                            </option>
                        ))}
                    </select>
                    <label>Month: </label>
                    <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                        {[...Array(12)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                </div>
                <ul>
                    {investmentsByCategory.map((investment, index) => (
                        <li key={index}>{investment.category}: ${investment.totalInvested.toFixed(2)}</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Monthly Earnings Percentage</h2>
                <ul>
                    {monthlyPercentage.map((earning, index) => (
                        <li key={index}>{earning.period}: {earning.percentage.toFixed(2)}%</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Yearly Earnings Percentage</h2>
                <ul>
                    {yearlyPercentage.map((earning, index) => (
                        <li key={index}>{earning.period}: {earning.percentage.toFixed(2)}%</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Movement History</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Investment</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movementHistory.map((movement, index) => (
                            <tr key={index}>
                                <td>{movement.investmentName}</td>
                                <td>${movement.amount.toFixed(2)}</td>
                                <td>{new Date(movement.transactionDate).toLocaleDateString()}</td>
                                <td>{movement.transactionType}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default Dashboard;
