import React from 'react';
import { Card, List, ListItem } from 'actify';

const InvestmentList = ({ investments }) => (
  <Card>
    <h2>Investments</h2>
    <List>
      {investments.map(investment => (
        <ListItem key={investment.id}>
          <div>
            <strong>{investment.name}</strong>
            <br />
            Categories: {investment.categories ? investment.categories.map(c => c.name).join(', ') : 'None'}
            <br />
            Initial Value: ${investment.initialValue}
            <br />
            Current Value: ${investment.currentValue}
            <br />
            Investment Date: {new Date(investment.investmentDate).toLocaleDateString()}
          </div>
        </ListItem>
      ))}
    </List>
  </Card>
);

export default InvestmentList;
