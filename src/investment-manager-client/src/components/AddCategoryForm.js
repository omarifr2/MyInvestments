import React, { useState } from 'react';
import { TextField, Button } from 'actify';

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
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          label="Category Name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <Button type="submit">Add Category</Button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
