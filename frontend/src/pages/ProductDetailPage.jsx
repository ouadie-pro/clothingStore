import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaHeart, FaChevronLeft, FaChevronRight, FaStarHalfAlt } from 'react-icons/fa';
import { Button, Loading, Error } from '../components/ui';
import { productService } from '../services';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colors = [
    { name: 'Classic White', value: 'white', hex: '#ffffff', border: true },
    { name: 'Charcoal', value: 'charcoal', hex: '#374151' },
    { name: 'Navy', value: 'navy', hex: '#1e3a8a' },
    { name: 'Stone', value: 'stone', hex: '#78716c' },
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productService.getProduct(id);
        setProduct(response.data || response);
        if (response.images?.length > 0) {
          setSelectedColor(response.colors?.[0] || null);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    setAddingToCart(true);
    try {
      await addItem(product.id, quantity, selectedSize, selectedColor);
    } catch (err) {
      console.error('Failed to add to cart:', err);
    } finally {
      setAddingToCart(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-amber-500 text-sm" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-amber-500 text-sm" />);
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" text="Loading product..." />
      </div>
    );
  }

  if (error || !product) {
    return <Error message={error || 'Product not found'} onRetry={() => window.location.reload()} />;
  }

  const productImages = product.images || [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCsGYdSTWVh-_ZjaldWwfrzqJM6NlPpZarxd3c-zhm5SIp_7Gd4tdvn4jybimGnC0ErfBqOHxaOF52q9aQOMNk416sSAz8q8yPKuvAGXewwJenccRzp1QblYIY0aAsr4r18Q1GVhCUX2nGrkYbavpGCzx2y-t8OW46ZkMxz22fFOENbDcI7417MS6K0_oTk-To7ad3aQlPxwtXdyLCAzxSCDzMneOgWJzDzxNmpaKF-SUy_q1UFooLUqpy7BfrY0nNR1TErwIv6PlA',
  ];

  return (
    <div className="flex-1 max-w-[1280px] mx-auto w-full px-10 py-8">
      {/* Breadcrumbs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link to="/" className="text-slate-500 text-sm font-medium hover:text-primary transition-colors">Home</Link>
        <span className="text-slate-400 text-sm">›</span>
        <Link to="/shop" className="text-slate-500 text-sm font-medium hover:text-primary transition-colors">Shop</Link>
        <span className="text-slate-400 text-sm">›</span>
        <Link to={`/${product.category?.toLowerCase()}`} className="text-slate-500 text-sm font-medium hover:text-primary transition-colors">
          {product.category}
        </Link>
        <span className="text-slate-400 text-sm">›</span>
        <span className="text-slate-900 dark:text-slate-100 text-sm font-bold uppercase tracking-wide">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden aspect-[4/5]">
            <div
              className="w-full h-full bg-center bg-no-repeat bg-cover"
              style={{ backgroundImage: `url('${productImages[selectedImage]}')` }}
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-[3/4] bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  selectedImage === index ? 'border-primary' : 'border-transparent hover:border-slate-300'
                }`}
                style={{ backgroundImage: `url('${image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="text-xs font-bold text-primary tracking-widest uppercase">{product.collection || 'Premium Collection'}</span>
          </div>
          <h1 className="text-slate-900 dark:text-slate-100 text-4xl font-extrabold leading-tight tracking-tight mb-2">
            {product.name}
          </h1>
          <div className="flex items-center gap-4 mb-6">
            <p className="text-slate-900 dark:text-slate-100 text-3xl font-light">${product.price}</p>
            {product.original_price && (
              <p className="text-xl text-slate-400 line-through">${product.original_price}</p>
            )}
            <div className="flex items-center gap-1 border-l border-slate-300 dark:border-slate-700 pl-4">
              <div className="flex">
                {renderStars(product.rating || 4.8)}
              </div>
              <span className="text-slate-500 text-sm font-medium">({product.reviews || 215} reviews)</span>
            </div>
          </div>

          <div className="space-y-8">
            {/* Color Selector */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <p className="text-slate-late-100 font-bold">
900 dark:text-s                  Color: <span className="font-normal text-slate-500">{selectedColor?.name || 'Select color'}</span>
                </p>
              </div>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color)}
                    className={`size-10 rounded-full border-2 transition-all ${selectedColor?.value === color.value ? 'border-primary p-0.5' : 'border-transparent'}`}
                  >
                    <div
                      className={`w-full h-full rounded-full ${color.border ? 'border border-slate-200' : ''}`}
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <p className="text-slate-900 dark:text-slate-100 font-bold">Size</p>
                <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                  <span className="material-symbols-outlined text-base">straighten</span> Size Guide
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 border rounded-lg flex items-center justify-center font-bold transition-all ${
                      selectedSize === size
                        ? 'border-2 border-primary bg-primary/5'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex flex-col gap-3">
              <p className="text-slate-900 dark:text-slate-100 font-bold">Quantity</p>
              <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  -
                </button>
                <span className="px-6 py-2 font-bold border-x border-slate-200 dark:border-slate-700">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                loading={addingToCart}
                className="flex-1 h-14 rounded-xl text-lg flex items-center justify-center gap-2 shadow-lg"
              >
                <FaShoppingCart />
                Add to Cart
              </Button>
              <Button className="w-14 h-14 border-2 border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-red-500 hover:border-red-200 transition-all">
                <FaHeart />
              </Button>
            </div>

            {/* Shipping Info */}
            <div className="flex flex-col gap-4 py-6 border-t border-slate-200 dark:border-slate-800 mt-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400">local_shipping</span>
                <p className="text-sm text-slate-600 dark:text-slate-400">Free express shipping on orders over $150</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400">keyboard_return</span>
                <p className="text-sm text-slate-600 dark:text-slate-400">30-day hassle-free return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-24 border-t border-slate-200 dark:border-slate-800 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-6">Product Description</h3>
            <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>{product.description || 'Meticulously crafted from the finest materials, this piece offers an unmatched combination of luxury and comfort. Designed for a sharp, modern silhouette, it features premium details and reinforced construction for lasting durability.'}</p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>Premium quality materials</li>
                <li>Modern tailored fit</li>
                <li>Hand-stitched details</li>
                <li>Garment-dyed for unique color depth</li>
                <li>Pre-shrunk for a consistent fit</li>
              </ul>
            </div>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800/50 p-8 rounded-2xl">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">info</span> Care Instructions
            </h3>
            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[18px]">wash</span>
                <span>Machine wash cold on gentle cycle</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[18px]">dry_cleaning</span>
                <span>Do not tumble dry. Hang to dry</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[18px]">iron</span>
                <span>Iron on medium heat while damp</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
