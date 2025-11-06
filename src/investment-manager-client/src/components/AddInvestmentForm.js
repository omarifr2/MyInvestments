import React, { useState } from 'react';
import { TextField, Button } from 'actify';

const AddInvestmentForm = ({ categories, onInvestmentSubmit }) => {
  const [newInvestmentName, setNewInvestmentName] = useState('');
  const [newInvestmentInitialValue, setNewInvestmentInitialValue] = useState('');
  const [newInvestmentDate, setNewInvestmentDate] = useState('');
  const [newInvestmentCategories, setNewInvestmentCategories] = useState([]);

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setNewInvestmentCategories(selectedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newInvestment = {
      name: newInvestmentName,
      initialValue: parseFloat(newInvestmentInitialValue),
      investmentDate: newInvestmentDate,
      categoryIds: newInvestmentCategories.map(id => parseInt(id))
    };
    onInvestmentSubmit(newInvestment);
    setNewInvestmentName('');
    setNewInvestmentInitialValue('');
    setNewInvestmentDate('');
    setNewInvestmentCategories([]);
  };

  return (
    <div>
      <h2>Add New Investment</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          label="Investment Name"
          value={newInvestmentName}
          onChange={(e) => setNewInvestmentName(e?.target?.value ?? e)}
        />
        <TextField
          label="Initial Value"
          type="number"
          value={newInvestmentInitialValue}
          onChange={(e) => setNewInvestmentInitialValue(e?.target?.value ?? e)}
        />
        <TextField
          type="date"
          value={newInvestmentDate}
          onChange={(e) => setNewInvestmentDate(e?.target?.value ?? e)}
        />
        <select 
          multiple 
          onChange={handleCategoryChange}
          className="border border-gray-300 rounded p-2"
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <Button type="submit">Add Investment</Button>
      </form>
    </div>
  );
};

export default AddInvestmentForm;
