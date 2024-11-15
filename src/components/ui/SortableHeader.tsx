
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

interface SortableHeaderProps {
  label: string;
  sortKey: string;
  currentSort: SortConfig;
  onSort: (key: string) => void;
}

export function SortableHeader({ label, sortKey, currentSort, onSort }: SortableHeaderProps) {
  const isSorted = currentSort.key === sortKey;
  
  return (
    <button
      onClick={() => onSort(sortKey)}
      className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
    >
      {label}
      {isSorted ? (
        currentSort.direction === 'asc' ? (
          <ArrowUp className="w-4 h-4" />
        ) : (
          <ArrowDown className="w-4 h-4" />
        )
      ) : (
        <ArrowUpDown className="w-4 h-4" />
      )}
    </button>
  );
}