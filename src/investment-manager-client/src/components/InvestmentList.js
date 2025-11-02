import React from 'react';

const InvestmentList = ({ investments }) => (
  <div>
    <h2>Investments</h2>
    <ul>
      {investments.map(investment => (
        <li key={investment.id}>
          <strong>{investment.name}</strong>
          <br />
          Categories: {investment.categories.map(c => c.name).join(', ')}
          <br />
          Initial Value: ${investment.initialValue}
          <br />
          Current Value: ${investment.currentValue}
          <br />
          Investment Date: {new Date(investment.investmentDate).toLocaleDateString()}
        </li>
      ))}
    </ul>
  </div>
);

export default InvestmentList;
