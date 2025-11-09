import React from 'react';
import { Button, Card, Table, TableHeader, TableBody, Row, Cell, Column } from 'actify';

const InvestmentList = ({ investments, onAddInvestment }) => (
  <Card className="shadow-sm">
    <div className="border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Investments</h2>
          <p className="text-sm text-gray-500">
            Track and manage your investment portfolio
          </p>
        </div>
        <div className="flex space-x-3">
          <Button 
            onClick={onAddInvestment}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <span className="mr-2">+</span>
            New Investment
          </Button>
        </div>
      </div>
    </div>
    
    <div className="px-6 py-4">
      {investments.length === 0 ? (
        <div className="text-center py-8">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No investments</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating your first investment.</p>
          <div className="mt-6">
            <Button 
              onClick={onAddInvestment}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Add Investment
            </Button>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden">
          <Table className="min-w-full divide-y divide-gray-200">
            <TableHeader className="bg-gray-50">
              <Column className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </Column>
              <Column className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Value
              </Column>
              <Column className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </Column>
              <Column className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </Column>
              <Column className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </Column>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200">
              {investments.map((investment, index) => (
                <Row 
                  key={investment.id} 
                  className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <Cell className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {investment.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {investment.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {investment.id}
                        </div>
                      </div>
                    </div>
                  </Cell>
                  <Cell className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">
                      ${(investment.currentValue || 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      USD
                    </div>
                  </Cell>
                  <Cell className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {investment.categoryName || 'Uncategorized'}
                    </span>
                  </Cell>
                  <Cell className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </Cell>
                  <Cell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button className="text-blue-600 hover:text-blue-900 text-sm px-3 py-1 border border-blue-300 rounded-md hover:bg-blue-50">
                        Edit
                      </Button>
                      <Button className="text-red-600 hover:text-red-900 text-sm px-3 py-1 border border-red-300 rounded-md hover:bg-red-50">
                        Delete
                      </Button>
                    </div>
                  </Cell>
                </Row>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
    
    {investments.length > 0 && (
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{' '}
            <span className="font-medium">{investments.length}</span> of{' '}
            <span className="font-medium">{investments.length}</span> results
          </div>
          <div className="flex space-x-2">
            <Button 
              disabled 
              className="px-3 py-1 text-sm border border-gray-300 rounded-md bg-gray-100 text-gray-400"
            >
              Previous
            </Button>
            <Button 
              disabled 
              className="px-3 py-1 text-sm border border-gray-300 rounded-md bg-gray-100 text-gray-400"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    )}
  </Card>
);

export default InvestmentList;
