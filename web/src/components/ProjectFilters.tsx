// web/src/components/ProjectFilters.tsx
import React from 'react';

interface ProjectFiltersProps {
    onSearch: (term: string) => void;
    onSortChange: (field: 'title' | 'createdAt') => void;
    sortField: string;
}

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
    onSearch,
    onSortChange,
    sortField
}) => {
    return (
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-1/3">
                <input
                    type="search"
                    placeholder="Search projects..."
                    onChange={(e) => onSearch(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300"
                />
            </div>
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                    value={sortField}
                    onChange={(e) => onSortChange(e.target.value as 'title' | 'createdAt')}
                    className="px-4 py-2 rounded-md border border-gray-300"
                >
                    <option value="title">Title</option>
                    <option value="createdAt">Date Created</option>
                </select>
            </div>
        </div>
    );
};