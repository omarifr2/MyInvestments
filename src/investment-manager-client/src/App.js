import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [investments, setInvestments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newInvestmentName, setNewInvestmentName] = useState('');
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
        setInvestments([...investments, data]);
        setNewInvestmentName('');
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
            {investment.name} ({investment.categories.map(c => c.name).join(', ')})
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
