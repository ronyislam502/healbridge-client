import React from 'react';

const categories = [
  'All Articles',
  'Healthcare',
  'Wellness',
  'Medical Advice',
  'Nutrition',
  'Technology',
  'Mental Health',
  'Dental Care',
];

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="mb-12 overflow-x-auto pb-4 scrollbar-hide">
      <div className="flex items-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
              activeCategory === category
                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-primary/30 hover:bg-primary/5'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
