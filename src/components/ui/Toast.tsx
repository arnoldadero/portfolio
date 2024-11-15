
import { XCircle, CheckCircle, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: AlertCircle
  };
  
  const Icon = icons[type];
  const colors = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200'
  };

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-lg border ${colors[type]} animate-slide-up`}>
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5" />
        <p>{message}</p>
        <button onClick={onClose} className="ml-4">
          <XCircle className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}