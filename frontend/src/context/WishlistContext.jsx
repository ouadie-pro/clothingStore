import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem('wishlist');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(items));
  }, [items]);

  const addItem = async (productId) => {
    if (!items.includes(productId)) {
      setItems((prev) => [...prev, productId]);
    }
  };

  const removeItem = async (productId) => {
    setItems((prev) => prev.filter((id) => id !== productId));
  };

  const toggleItem = async (productId) => {
    if (items.includes(productId)) {
      await removeItem(productId);
    } else {
      await addItem(productId);
    }
  };

  const isInWishlist = (productId) => items.includes(productId);

  const clearWishlist = async () => {
    setItems([]);
  };

  const value = {
    items,
    addItem,
    removeItem,
    toggleItem,
    isInWishlist,
    clearWishlist,
    itemCount: items.length,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export default WishlistContext;
