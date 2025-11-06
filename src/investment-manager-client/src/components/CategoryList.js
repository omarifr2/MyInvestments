import React from 'react';
import { Button, Card, Table, Thead, Tbody, Tr, Th, Td } from 'actify';

const CategoryList = ({ categories, onAddCategory }) => (
  <Card>
    <div className="flex justify-between items-center p-4">
      <h2>Categories</h2>
      <Button onClick={onAddCategory}>New Category</Button>
    </div>
    <Table>
      <Thead>
        <Tr>
          <Th>Name</Th>
        </Tr>
      </Thead>
      <Tbody>
        {categories.map(category => (
          <Tr key={category.id}>
            <Td>{category.name}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </Card>
);

export default CategoryList;
