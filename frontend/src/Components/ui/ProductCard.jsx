import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';

const ProductCard = ({ product, onAddToCart, onToggleWishlist }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product.id);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleWishlist?.(product.id);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group cursor-pointer block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-100 mb-4">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-slate-200 animate-pulse" />
        )}
        <img
          src={product.image || product.images?.[0]}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {product.is_new && (
          <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
            New
          </span>
        )}
        
        {product.is_sale && (
          <span className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
            Sale
          </span>
        )}

        <button
          onClick={handleWishlist}
          className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full text-slate-400 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
        >
          <FaHeart className="text-xl" />
        </button>

        <div
          className={`absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/20 to-transparent transition-transform duration-300 ${
            isHovered ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <button
            onClick={handleQuickAdd}
            className="w-full py-3 bg-white dark:bg-slate-900 text-sm font-bold rounded-lg shadow-lg hover:bg-primary hover:text-white transition-all uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <FaShoppingCart className="text-sm" />
            Quick Add
          </button>
        </div>
      </div>

      <div className="flex justify-between items-start">
        <div>
          {product.category && (
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">
              {product.category}
            </p>
          )}
          <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-slate-500 text-sm">{product.variant || product.description}</p>
        </div>
        <div>
          {product.original_price && (
            <p className="text-sm text-slate-400 line-through mr-2">
              ${product.original_price}
            </p>
          )}
          <p className={`font-bold text-lg ${product.is_sale ? 'text-red-500' : 'text-primary'}`}>
            ${product.price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
