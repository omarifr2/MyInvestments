import React, { useState } from 'react';

const AddCategoryForm = ({ onCategorySubmit }) => {
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = {
      name: newCategoryName,
    };
    onCategorySubmit(newCategory);
    setNewCategoryName('');
  };

  return (
    <div>
      <h2>Add New Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Category Name"
        />
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
