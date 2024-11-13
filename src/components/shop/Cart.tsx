import React from 'react';
import { useCart } from '../../store/useCart';
import { Minus, Plus, Trash2 } from 'lucide-react';

export function Cart() {
  const { items, removeItem, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {items.map(({ product, quantity }) => (
        <div key={product.id} className="py-4 flex items-center gap-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-16 h-16 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              onClick={() => removeItem(product.id)}
              className="p-1 text-red-500 hover:bg-red-50 rounded-full ml-2"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
      <div className="py-4">
        <div className="flex justify-between font-medium text-lg">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button
          onClick={() => alert('Checkout functionality coming soon!')}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}