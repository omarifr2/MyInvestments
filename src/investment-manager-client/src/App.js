import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import InvestmentList from './components/InvestmentList';
import AddInvestmentForm from './components/AddInvestmentForm';
import CategoryList from './components/CategoryList';
import AddCategoryForm from './components/AddCategoryForm';
import Dashboard from './components/Dashboard';
import MonthlyInvestment from './components/MonthlyInvestment';

function App() {
  const [investments, setInvestments] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/investments')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setInvestments(data))
      .catch(error => {
        console.error('Error fetching investments:', error);
      });
    
    fetch('/api/categories')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setCategories(data))
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleInvestmentSubmit = (newInvestment) => {
    fetch('/api/investments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newInvestment),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (!investments.some(investment => investment.id === data.id)) {
          setInvestments([...investments, data]);
        }
      })
      .catch(error => {
        console.error('Error creating investment:', error);
        alert('Failed to create investment. Please check the console for details.');
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
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      setCategories([...categories, data]);
    })
    .catch(error => {
      console.error('Error creating category:', error);
      alert('Failed to create category. Please check the console for details.');
    });
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/monthly-investment">Monthly Investment</Link>
            </li>
          </ul>
        </nav>
        <h1>Investment Manager</h1>
        <Routes>
          <Route path="/" element={
            <>
              <InvestmentList investments={investments} />
              <AddInvestmentForm categories={categories} onInvestmentSubmit={handleInvestmentSubmit} />
              <CategoryList categories={categories} />
              <AddCategoryForm onCategorySubmit={handleCategorySubmit} />
            </>
          } />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/monthly-investment" element={<MonthlyInvestment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
