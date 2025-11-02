import React, { useState } from 'react';

const AddInvestmentForm = ({ categories, onInvestmentSubmit }) => {
  const [newInvestmentName, setNewInvestmentName] = useState('');
  const [newInvestmentInitialValue, setNewInvestmentInitialValue] = useState('');
  const [newInvestmentDate, setNewInvestmentDate] = useState('');
  const [newInvestmentCategoryId, setNewInvestmentCategoryId] = useState('');

  const handleCategoryChange = (e) => {
    setNewInvestmentCategoryId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newInvestment = {
      name: newInvestmentName,
      initialValue: parseFloat(newInvestmentInitialValue),
      investmentDate: newInvestmentDate,
      categoryIds: [parseInt(newInvestmentCategoryId)]
    };
    onInvestmentSubmit(newInvestment);
    setNewInvestmentName('');
    setNewInvestmentInitialValue('');
    setNewInvestmentDate('');
    setNewInvestmentCategoryId('');
  };

  return (
    <div>
      <h2>Add New Investment</h2>
      <form onSubmit={handleSubmit}>
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
        <select value={newInvestmentCategoryId} onChange={handleCategoryChange}>
          <option value="">Select a category</option>
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
};

export default AddInvestmentForm;
