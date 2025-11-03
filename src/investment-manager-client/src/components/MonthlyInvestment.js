import React, { useState, useEffect } from 'react';

const MonthlyInvestment = () => {
    const [investments, setInvestments] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [transactions, setTransactions] = useState({});
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        fetch('/api/investments')
            .then(response => response.json())
            .then(data => setInvestments(data));
    }, []);

    useEffect(() => {
        fetch(`/api/monthlyinvestments/summary?year=${year}&month=${month}`)
            .then(response => response.json())
            .then(data => setSummary(data));
    }, [year, month]);

    const handleTransactionChange = (investmentId, amount) => {
        setTransactions({
            ...transactions,
            [investmentId]: amount
        });
    };

    const handleSave = () => {
        const transactionData = Object.keys(transactions).map(investmentId => ({
            investmentId: parseInt(investmentId),
            amount: parseFloat(transactions[investmentId]),
            transactionDate: new Date(year, month - 1, 1),
            transactionType: "Deposit"
        }));

        fetch('/api/monthlyinvestments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transactionData),
        }).then(() => {
            alert('Saved successfully!');
            fetch(`/api/monthlyinvestments/summary?year=${year}&month=${month}`)
                .then(response => response.json())
                .then(data => setSummary(data));
        });
    };

    return (
        <div>
            <h2>Monthly Investment</h2>
            <div>
                <label>Year:</label>
                <select value={year} onChange={e => setYear(e.target.value)}>
                    {[...Array(10).keys()].map(i => (
                        <option key={i} value={new Date().getFullYear() - i}>
                            {new Date().getFullYear() - i}
                        </option>
                    ))}
                </select>
                <label>Month:</label>
                <select value={month} onChange={e => setMonth(e.target.value)}>
                    {[...Array(12).keys()].map(i => (
                        <option key={i} value={i + 1}>
                            {new Date(0, i).toLocaleString('default', { month: 'long' })}
                        </option>
                    ))}
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Investment</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {investments.map(investment => (
                        <tr key={investment.id}>
                            <td>{investment.name}</td>
                            <td>
                                <input
                                    type="number"
                                    onChange={e => handleTransactionChange(investment.id, e.target.value)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleSave}>Save</button>
            {summary && (
                <div>
                    <h3>Summary for {month}/{year}</h3>
                    <p>Total: {summary.total}</p>
                    <h4>Category Summary</h4>
                    <ul>
                        {summary.categorySummary.map(c => (
                            <li key={c.category}>{c.category}: {c.total}</li>
                        ))}
                    </ul>
                    <p>Previous Month Total: {summary.previousMonthTotal}</p>
                </div>
            )}
        </div>
    );
};

export default MonthlyInvestment;
