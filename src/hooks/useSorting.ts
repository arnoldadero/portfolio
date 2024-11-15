import { useState, useMemo } from 'react';

type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
};

export function useSorting<T>(items: T[], defaultSort: SortConfig) {
  const [sortConfig, setSortConfig] = useState<SortConfig>(defaultSort);

  const sortedItems = useMemo(() => {
    if (!items) return [];
    
    const sortedArray = [...items];
    sortedArray.sort((a: any, b: any) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sortedArray;
  }, [items, sortConfig]);

  const requestSort = (key: string) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  return { items: sortedItems, sortConfig, requestSort };
}