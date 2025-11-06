import React from 'react';
import { Card, List, ListItem } from 'actify';

const CategoryList = ({ categories }) => (
  <Card>
    <h2>Categories</h2>
    <List>
      {categories.map(category => (
        <ListItem key={category.id}>{category.name}</ListItem>
      ))}
    </List>
  </Card>
);

export default CategoryList;
