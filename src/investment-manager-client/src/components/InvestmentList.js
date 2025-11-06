import React from 'react';
import { Button, Card, Table, Thead, Tbody, Tr, Th, Td } from 'actify';

const InvestmentList = ({ investments, onAddInvestment }) => (
  <Card>
    <div className="flex justify-between items-center p-4">
      <h2>Investments</h2>
      <Button onClick={onAddInvestment}>New Investment</Button>
    </div>
    <Table>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Current Value</Th>
        </Tr>
      </Thead>
      <Tbody>
        {investments.map(investment => (
          <Tr key={investment.id}>
            <Td>{investment.name}</Td>
            <Td>${investment.currentValue}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </Card>
);

export default InvestmentList;
