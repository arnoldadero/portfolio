import React from 'react';
import { Home, Anchor, FileText, Settings, HelpCircle } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', icon: Home },
  { name: 'Catches', icon: Anchor },
  { name: 'Reports', icon: FileText },
  { name: 'Settings', icon: Settings },
  { name: 'Help', icon: HelpCircle },
];

export function Sidebar() {
  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:bg-gray-50 lg:pt-5">
      <div className="flex flex-col flex-1 h-0 overflow-y-auto">
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => (
            <button
              key={item.name}
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 w-full"
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}