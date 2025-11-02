import React, { useState, useEffect } from 'react';
import './App.css';
import InvestmentList from './components/InvestmentList';
import AddInvestmentForm from './components/AddInvestmentForm';
import CategoryList from './components/CategoryList';
import AddCategoryForm from './components/AddCategoryForm';

function App() {
  const [investments, setInvestments] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/investments')
      .then(response => response.json())
      .then(data => setInvestments(data));
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data));
  }, []);

  const handleInvestmentSubmit = (newInvestment) => {
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
      });
  };

  const handleCategorySubmit = (newCategory) => {
    fetch('/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCategory),
    })
    .then(response => response.json())
    .then(data => {
      setCategories([...categories, data]);
    });
  };

  return (
    <div className="App">
      <h1>Investment Manager</h1>
      <InvestmentList investments={investments} />
      <AddInvestmentForm categories={categories} onInvestmentSubmit={handleInvestmentSubmit} />
      <CategoryList categories={categories} />
      <AddCategoryForm onCategorySubmit={handleCategorySubmit} />
    </div>
  );
}

export default App;
