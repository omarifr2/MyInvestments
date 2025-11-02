import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [investments, setInvestments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newInvestmentName, setNewInvestmentName] = useState('');
  const [newInvestmentInitialValue, setNewInvestmentInitialValue] = useState('');
  const [newInvestmentDate, setNewInvestmentDate] = useState('');
  const [newInvestmentCategories, setNewInvestmentCategories] = useState([]);

  useEffect(() => {
    fetch('/api/investments')
      .then(response => response.json())
      .then(data => setInvestments(data));
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data));
  }, []);

  const handleInvestmentSubmit = (e) => {
    e.preventDefault();
    const newInvestment = {
      name: newInvestmentName,
      initialValue: parseFloat(newInvestmentInitialValue),
      investmentDate: newInvestmentDate,
      categories: newInvestmentCategories.map(id => categories.find(c => c.id === parseInt(id)))
    };
    fetch('/api/investments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newInvestment),
    })
      .then(response => response.json())
      .then(data => {
        if (!investments.some(investment => investment.id === data.id)) {
          setInvestments([...investments, data]);
        }
        setNewInvestmentName('');
        setNewInvestmentInitialValue('');
        setNewInvestmentDate('');
        setNewInvestmentCategories([]);
      });
  };

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setNewInvestmentCategories(selectedOptions);
  };

  return (
    <div className="App">
      <h1>Investment Manager</h1>
      <h2>Investments</h2>
      <ul>
        {investments.map(investment => (
          <li key={investment.id}>
            <strong>{investment.name}</strong>
            <br />
            Categories: {investment.categories.map(c => c.name).join(', ')}
            <br />
            Initial Value: ${investment.initialValue}
            <br />
            Current Value: ${investment.currentValue}
            <br />
            Investment Date: {new Date(investment.investmentDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
      <h2>Add New Investment</h2>
      <form onSubmit={handleInvestmentSubmit}>
        <input
          type="text"
          value={newInvestmentName}
          onChange={(e) => setNewInvestmentName(e.target.value)}
          placeholder="Investment Name"
        />
        <input
          type="number"
          value={newInvestmentInitialValue}
          onChange={(e) => setNewInvestmentInitialValue(e.target.value)}
          placeholder="Initial Value"
        />
        <input
          type="date"
          value={newInvestmentDate}
          onChange={(e) => setNewInvestmentDate(e.target.value)}
          placeholder="Investment Date"
        />
        <select multiple onChange={handleCategoryChange}>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Investment</button>
      </form>
    </div>
  );
}

export default App;
