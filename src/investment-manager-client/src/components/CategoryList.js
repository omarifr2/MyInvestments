import React from 'react';
import { Button, Card, Table, TableHeader, TableBody, Row, Cell, Column } from 'actify';

const CategoryList = ({ categories, onAddCategory }) => (
  <Card>
    <div className="flex justify-between items-center p-4">
      <h2>Categories</h2>
      <Button onClick={onAddCategory}>New Category</Button>
    </div>
    <Table>
      <TableHeader>
        <Column>Name</Column>
      </TableHeader>
      <TableBody>
        {categories.map(category => (
          <Row key={category.id}>
            <Cell>{category.name}</Cell>
          </Row>
        ))}
      </TableBody>
    </Table>
  </Card>
);

export default CategoryList;
