import React from 'react';
import { Button, Card, Table, TableHeader, TableBody, Row, Cell, Column } from 'actify';

const InvestmentList = ({ investments, onAddInvestment }) => (
  <Card>
    <div className="flex justify-between items-center p-4">
      <h2>Investments</h2>
      <Button onClick={onAddInvestment}>New Investment</Button>
    </div>
    <Table>
      <TableHeader>
        <Column>Name</Column>
        <Column>Current Value</Column>
      </TableHeader>
      <TableBody>
        {investments.map(investment => (
          <Row key={investment.id}>
            <Cell>{investment.name}</Cell>
            <Cell>${investment.currentValue}</Cell>
          </Row>
        ))}
      </TableBody>
    </Table>
  </Card>
);

export default InvestmentList;
