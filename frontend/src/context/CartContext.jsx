import { createContext, useContext, useState, useEffect } from 'react';
import { cartService, authService } from '../services';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const data = await cartService.getCart();
      setItems(data.items || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const clearLocalCart = () => {
    localStorage.removeItem('mock_cart');
    setItems([]);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    const handleAuthLogin = async () => {
      if (authService.isAuthenticated()) {
        await fetchCart();
      }
    };

    const handleAuthLogout = () => {
      clearLocalCart();
    };

    window.addEventListener('auth:login', handleAuthLogin);
    window.addEventListener('auth:logout', handleAuthLogout);

    return () => {
      window.removeEventListener('auth:login', handleAuthLogin);
      window.removeEventListener('auth:logout', handleAuthLogout);
    };
  }, []);

  const addItem = async (productId, quantity = 1, size = null, color = null) => {
    setLoading(true);
    try {
      const data = await cartService.addToCart(productId, quantity, size, color);
      setItems(data.items || []);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add item');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (itemId, quantity) => {
    try {
      const data = await cartService.updateCartItem(itemId, quantity);
      setItems(data.items || []);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update item');
      throw err;
    }
  };

  const removeItem = async (itemId) => {
    try {
      const data = await cartService.removeFromCart(itemId);
      setItems(data.items || []);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to remove item');
      throw err;
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart();
      setItems([]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to clear cart');
      throw err;
    }
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const value = {
    items,
    loading,
    error,
    itemCount,
    subtotal,
    tax,
    total,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    refreshCart: fetchCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
