'use client';

import React from 'react';
import { Search, Filter } from 'lucide-react';
import { FORM_LEVELS, MATERIAL_TYPES } from '@/config/constants';

interface MaterialFilterProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: any) => void;
}

const MaterialFilter: React.FC<MaterialFilterProps> = ({ onSearch, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showFilters, setShowFilters] = React.useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <input
          type="text"
          placeholder="Search materials..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
        />
      </div>

      {/* Filter Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition"
      >
        <Filter className="w-5 h-5" />
        <span>Filters</span>
      </button>

      {/* Filters */}
      {showFilters && (
        <div className="p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-4">
          {/* Form Level */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Form Level
            </label>
            <select
              onChange={(e) => onFilterChange({ form_level_id: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Forms</option>
              {FORM_LEVELS.map((level) => (
                <option key={level.slug} value={level.slug}>
                  {level.name}
                </option>
              ))}
            </select>
          </div>

          {/* Material Type */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Material Type
            </label>
            <select
              onChange={(e) => onFilterChange({ material_type_id: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Types</option>
              {MATERIAL_TYPES.map((type) => (
                <option key={type.slug} value={type.slug}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Sort By
            </label>
            <select
              onChange={(e) => onFilterChange({ sort_by: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="downloads">Most Downloaded</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialFilter;
