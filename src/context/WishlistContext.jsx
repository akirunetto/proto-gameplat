import React, { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  // Temporary state (clears on hard refresh as requested)
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (gameId) => {
    setWishlist(prev => 
      prev.includes(gameId) 
        ? prev.filter(id => id !== gameId) 
        : [...prev, gameId]
    );
  };

  const isWishlisted = (gameId) => wishlist.includes(gameId);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
