import React from 'react';
import { Dialog } from 'actify';
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
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <InvestmentList investments={investments} onAddInvestment={() => setIsAddInvestmentOpen(true)} />
        <Dialog open={isAddInvestmentOpen} onClose={() => setIsAddInvestmentOpen(false)}>
          <AddInvestmentForm categories={categories} onInvestmentSubmit={handleInvestmentSubmit} />
        </Dialog>
      </div>
      <div className="col-span-1">
        <CategoryList categories={categories} onAddCategory={() => setIsAddCategoryOpen(true)} />
        <Dialog open={isAddCategoryOpen} onClose={() => setIsAddCategoryOpen(false)}>
          <AddCategoryForm onCategorySubmit={handleCategorySubmit} />
        </Dialog>
      </div>
    </div>
  );
};

export default Home;
