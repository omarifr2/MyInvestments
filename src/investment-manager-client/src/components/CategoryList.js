import React from 'react';

const CategoryList = ({ categories }) => (
  <div>
    <h2>Categories</h2>
    <ul>
      {categories.map(category => (
        <li key={category.id}>{category.name}</li>
      ))}
    </ul>
  </div>
);

export default CategoryList;
