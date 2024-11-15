import { useSync } from '../hooks/useSync';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { Toast } from './ui/Toast';
import { useToast } from '../hooks/useToast';

interface AdminContentProps<T> {
  data: T[];
  queryKey: string[];
  renderItem: (item: T) => React.ReactNode;
  isLoading?: boolean;
  error?: Error | null;
  selectedItems?: string[];
  onSelect?: (id: string) => void;
}

export function AdminContent<T extends { id: string }>({ 
  data,
  queryKey,
  renderItem,
  isLoading,
  error,
  selectedItems = [],
  onSelect
}: AdminContentProps<T>) {
  const { toast, showToast, hideToast } = useToast();
  useSync(queryKey, () => showToast('Content synchronized', 'info'));

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-600">
        Error: {error.message}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4">
        {data?.map((item) => (
          <div 
            key={item.id} 
            className={`bg-white p-6 rounded-xl shadow-sm ${
              selectedItems.includes(item.id) ? 'ring-2 ring-indigo-500' : ''
            }`}
            onClick={(e) => {
              e.preventDefault();
              onSelect?.(item.id);
            }}
          >
            {renderItem(item)}
          </div>
        ))}
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </>
  );
}