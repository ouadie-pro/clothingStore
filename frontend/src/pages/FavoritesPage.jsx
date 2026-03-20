import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaChevronRight } from 'react-icons/fa';
import { ProductCard } from '../components/ui';
import { productService } from '../services';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const FavoritesPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { items: wishlistItems, toggleItem, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (wishlistItems.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await productService.getProducts();
        const allProducts = response.data || response;
        const wishlistProducts = allProducts.filter(p => wishlistItems.includes(p.id));
        setProducts(wishlistProducts);
      } catch (err) {
        console.error('Failed to load wishlist products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistProducts();
  }, [wishlistItems]);

  const handleAddToCart = async (productId) => {
    try {
      await addItem(productId, 1);
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-16 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-48 mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-slate-200 rounded-xl aspect-[3/4]"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-16 py-12">
      <div className="mb-12">
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <FaChevronRight className="text-xs" />
          <span className="text-slate-900 dark:text-slate-100 font-medium">Favorites</span>
        </nav>
        <h1 className="text-5xl font-extrabold tracking-tight mb-3">My Favorites</h1>
        <p className="text-lg text-slate-500">
          {products.length === 0 
            ? 'You haven\'t saved any items yet.' 
            : `${products.length} saved item${products.length !== 1 ? 's' : ''}`}
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onToggleWishlist={toggleItem}
              isInWishlist={isInWishlist(product.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <FaHeart className="text-6xl text-slate-300 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">No favorites yet</h3>
          <p className="text-slate-500 mb-6">Save items you love by clicking the heart icon.</p>
          <Link 
            to="/shop" 
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
