import React, { useState } from 'react';
import { ProductGrid } from './components/shop/ProductGrid';
import { Cart } from './components/shop/Cart';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Stats } from './components/Stats';
import { Footer } from './components/Footer';
import { Dashboard } from './components/dashboard/Dashboard';
import { LoginForm } from './components/auth/LoginForm';
import { ShoppingCart, X, Menu } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useCart } from './store/useCart';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'shop'>('home');
  const items = useCart(state => state.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogin = (email: string, password: string) => {
    if (email && password) {
      setIsLoggedIn(true);
      setShowLogin(false);
    }
  };

  if (isLoggedIn) {
    return <Dashboard />;
  }

  if (showLogin) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-8">
              <span className="text-2xl font-bold text-blue-600">FishChain</span>
              <nav className="hidden md:flex space-x-4">
                <button 
                  onClick={() => setActiveTab('home')}
                  className={`px-3 py-2 rounded-md ${
                    activeTab === 'home' 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Home
                </button>
                <button 
                  onClick={() => setActiveTab('shop')}
                  className={`px-3 py-2 rounded-md ${
                    activeTab === 'shop' 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Shop
                </button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowLogin(true)}
                className="hidden md:block px-4 py-2 text-blue-600 hover:text-blue-700"
              >
                Sign In
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-600 hover:text-gray-900"
              >
                <ShoppingCart className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
              <button className="md:hidden p-2 text-gray-600 hover:text-gray-900">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {activeTab === 'home' ? (
          <>
            <Hero />
            <Features />
            <Stats />
          </>
        ) : (
          <ProductGrid />
        )}
      </main>

      <Footer />

      {/* Cart Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-50 ${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsCartOpen(false)}
      />
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl transform transition-transform z-50 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="px-4 py-6 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Shopping Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-4">
            <Cart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;