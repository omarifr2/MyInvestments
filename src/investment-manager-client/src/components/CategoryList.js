import React from 'react';
import { Button, Card } from 'actify';

const CategoryList = ({ categories, onAddCategory }) => (
  <Card className="shadow-sm">
    <div className="border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
          <p className="text-sm text-gray-500">
            Organize your investments
          </p>
        </div>
        <Button 
          onClick={onAddCategory}
          className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
        >
          <span className="mr-1">+</span>
          Add
        </Button>
      </div>
    </div>
    
    <div className="px-6 py-4">
      {categories.length === 0 ? (
        <div className="text-center py-6">
          <div className="mx-auto h-8 w-8 text-gray-400">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No categories</h3>
          <p className="mt-1 text-sm text-gray-500">Create categories to organize investments.</p>
          <div className="mt-4">
            <Button 
              onClick={onAddCategory}
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              Add Category
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {categories.map((category, index) => (
            <div 
              key={category.id} 
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 h-6 w-6">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-xs font-medium text-green-600">
                      {category.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">
                    {category.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    ID: {category.id}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button className="text-blue-600 hover:text-blue-900 text-xs px-2 py-1 border border-blue-300 rounded hover:bg-blue-50">
                  Edit
                </Button>
                <Button className="text-red-600 hover:text-red-900 text-xs px-2 py-1 border border-red-300 rounded hover:bg-red-50">
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    
    {categories.length > 0 && (
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="text-xs text-gray-600">
          {categories.length} {categories.length === 1 ? 'category' : 'categories'} total
        </div>
      </div>
    )}
  </Card>
);

export default CategoryList;
