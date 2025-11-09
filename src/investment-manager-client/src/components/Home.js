import React from 'react';
import { Dialog, Button, Card } from 'actify';
import InvestmentList from './InvestmentList';
import AddInvestmentForm from './AddInvestmentForm';
import CategoryList from './CategoryList';
import AddCategoryForm from './AddCategoryForm';

const Home = ({
  investments,
  categories,
  isAddInvestmentOpen,
  setIsAddInvestmentOpen,
  isAddCategoryOpen,
  setIsAddCategoryOpen,
  handleInvestmentSubmit,
  handleCategorySubmit,
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col space-y-4">
          {/* Breadcrumbs */}
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <span className="text-sm font-medium text-gray-700">Investment Manager</span>
              </li>
            </ol>
          </nav>
          
          {/* Page Title and Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your investments and categories
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <Button 
                onClick={() => setIsAddCategoryOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Add Category
              </Button>
              <Button 
                onClick={() => setIsAddInvestmentOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Add Investment
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">$</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">Total Investments</h3>
                  <p className="text-2xl font-semibold text-gray-900">{investments.length}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">%</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">Total Value</h3>
                  <p className="text-2xl font-semibold text-gray-900">
                    ${investments.reduce((sum, inv) => sum + (inv.currentValue || 0), 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">#</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">Categories</h3>
                  <p className="text-2xl font-semibold text-gray-900">{categories.length}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">⚡</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">Avg. Value</h3>
                  <p className="text-2xl font-semibold text-gray-900">
                    ${investments.length > 0 ? Math.round(investments.reduce((sum, inv) => sum + (inv.currentValue || 0), 0) / investments.length).toLocaleString() : 0}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Investments Section - Takes up 3/4 of the width on large screens */}
            <div className="lg:col-span-3 space-y-6">
              <InvestmentList 
                investments={investments} 
                onAddInvestment={() => setIsAddInvestmentOpen(true)} 
              />
            </div>
            
            {/* Categories Section - Takes up 1/4 of the width on large screens */}
            <div className="lg:col-span-1 space-y-6">
              <CategoryList 
                categories={categories} 
                onAddCategory={() => setIsAddCategoryOpen(true)} 
              />
              
              {/* Quick Actions Card */}
              <Card className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button 
                    onClick={() => setIsAddInvestmentOpen(true)}
                    className="w-full justify-start text-left px-3 py-2 text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md"
                  >
                    Add New Investment
                  </Button>
                  <Button 
                    onClick={() => setIsAddCategoryOpen(true)}
                    className="w-full justify-start text-left px-3 py-2 text-sm bg-green-50 text-green-700 hover:bg-green-100 rounded-md"
                  >
                    Create Category
                  </Button>
                  <Button 
                    className="w-full justify-start text-left px-3 py-2 text-sm bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    View Reports
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <Dialog open={isAddInvestmentOpen} onClose={() => setIsAddInvestmentOpen(false)}>
        <AddInvestmentForm categories={categories} onInvestmentSubmit={handleInvestmentSubmit} />
      </Dialog>
      
      <Dialog open={isAddCategoryOpen} onClose={() => setIsAddCategoryOpen(false)}>
        <AddCategoryForm onCategorySubmit={handleCategorySubmit} />
      </Dialog>
    </div>
  );
};

export default Home;
