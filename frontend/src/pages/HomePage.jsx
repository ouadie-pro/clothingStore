import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Button, ProductCard, Loading, Error } from '../components/ui';
import { productService } from '../services';
import { useCart } from '../context/CartContext';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addItem } = useCart();

  const itemsPerSlide = 4;

  const getVisibleProducts = () => {
    const products = trendingProducts.length > 0 ? trendingProducts : [
      { id: 1, name: 'Classic Wool Blazer', category: 'Outerwear', price: 245, image: '/images/imgMen/Men0.jpg' },
      { id: 2, name: 'Slim Fit Chinos', category: 'Bottoms', price: 89, is_new: true, image: '/images/imgMen/Men1.jpg' },
      { id: 3, name: 'Leather Handbag', category: 'Accessories', price: 280, image: '/images/imgWomen/Women3.webp' },
      { id: 4, name: 'Linen Trousers', category: 'Bottoms', price: 95, image: '/images/imgMen/Men9.jpg' },
      { id: 5, name: 'Silk Blouse', category: 'Tops', price: 145, image: '/images/imgWomen/Women0.webp' },
      { id: 6, name: 'Oxford Button-Down', category: 'Shirts', price: 75, image: '/images/imgMen/Men2.jpg' },
      { id: 7, name: 'Cashmere Cardigan', category: 'Knitwear', price: 195, image: '/images/imgWomen/Women2.webp' },
      { id: 8, name: 'Merino Wool Sweater', category: 'Knitwear', price: 120, image: '/images/imgMen/Men3.jpg' },
    ];
    const totalSlides = Math.ceil(products.length / itemsPerSlide);
    const startIndex = currentSlide * itemsPerSlide;
    return products.slice(startIndex, startIndex + itemsPerSlide);
  };

  const totalSlides = Math.ceil((trendingProducts.length > 0 ? trendingProducts.length : 8) / itemsPerSlide);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [featured, trending] = await Promise.all([
          productService.getFeaturedProducts(),
          productService.getTrendingProducts(),
        ]);
        setFeaturedProducts(featured.data || featured);
        setTrendingProducts(trending.data || trending);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await addItem(productId, 1);
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  const categories = [
    {
      name: "Men's Collection",
      subtitle: 'Refined Minimalism',
      image: '/images/imgMen/Men0.jpg',
    },
    {
      name: "Women's Collection",
      subtitle: 'Effortless Sophistication',
      image: '/images/imgWomen/Women1.webp',
    },
    {
      name: 'Accessories',
      subtitle: 'The Finishing Touch',
      image: '/images/imgMen/Men5.jpg',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" text="Loading..." />
      </div>
    );
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="px-6 lg:px-20 py-6">
        <div className="relative h-[600px] w-full overflow-hidden rounded-2xl bg-slate-200 group">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.1)), url('/images/imgMen/Men7.jpg')`,
            }}
          />
          <div className="absolute inset-0 flex flex-col items-start justify-center p-12 lg:p-24 text-white">
            <span className="bg-primary/90 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              New Season
            </span>
            <h1 className="font-serif text-5xl lg:text-7xl font-light leading-tight mb-6 max-w-2xl">
              Elevate Your <br />
              <span className="font-bold italic">Everyday Style</span>
            </h1>
            <p className="text-lg text-slate-200 mb-10 max-w-lg leading-relaxed font-light">
              Discover our curated collection of minimalist essentials designed for the modern lifestyle. Quality materials meet timeless silhouettes.
            </p>
            <div className="flex gap-4">
              <Link to="/shop">
                <Button size="lg" className="transform hover:-translate-y-1">
                  SHOP NEW ARRIVALS
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="!text-white !border-white hover:!bg-white/20">
                VIEW LOOKBOOK
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Discounts Banner */}
      <section className="px-6 lg:px-20 py-4">
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
          <span className="material-symbols-outlined text-primary">local_activity</span>
          <p className="text-primary font-bold">
            Limited Offer: Get 20% OFF your first order with code{' '}
            <span className="bg-primary text-white px-2 py-0.5 rounded ml-1">WELCOME20</span>
          </p>
          <Link to="/shop?sale=true" className="text-primary underline font-bold text-sm hover:opacity-80 transition-opacity">
            Shop the sale
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-6 lg:px-20 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h3 className="text-xs font-bold text-primary tracking-widest uppercase mb-2">Collections</h3>
            <h2 className="font-serif text-4xl font-semibold">Featured Categories</h2>
          </div>
          <Link to="/shop" className="text-slate-500 hover:text-primary font-bold text-sm flex items-center gap-2 group transition-colors">
            Explore All <FaArrowRight className="!text-sm group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/${category.name.toLowerCase().includes('men') ? 'men' : category.name.toLowerCase().includes('women') ? 'women' : 'accessories'}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-100 cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url('${category.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-8 left-8 text-white">
                <h4 className="text-2xl font-bold mb-1">{category.name}</h4>
                <p className="text-sm text-slate-300 font-medium">{category.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Now Section */}
      <section className="bg-white dark:bg-slate-900 py-20">
        <div className="px-6 lg:px-20 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h3 className="text-xs font-bold text-primary tracking-widest uppercase mb-2">Top Picks</h3>
            <h2 className="font-serif text-4xl font-semibold">Trending Now</h2>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handlePrevSlide}
              className="p-3 border border-slate-200 dark:border-slate-700 rounded-full hover:bg-primary hover:text-white transition-all disabled:opacity-50"
            >
              <FaChevronLeft />
            </button>
            <button 
              onClick={handleNextSlide}
              className="p-3 border border-slate-200 dark:border-slate-700 rounded-full hover:bg-primary hover:text-white transition-all"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
        <div className="px-6 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {getVisibleProducts().map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: totalSlides }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === i 
                    ? 'bg-primary w-8' 
                    : 'bg-slate-300 dark:bg-slate-600 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-6 lg:px-20 py-24 bg-slate-100 dark:bg-slate-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl font-semibold mb-6">Stay in the Loop</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg">
            Join our community to receive early access to new collections, exclusive invitations, and 10% off your next purchase.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary focus:outline-none text-slate-900 dark:text-white"
            />
            <Button size="lg">SUBSCRIBE</Button>
          </form>
          <p className="mt-4 text-xs text-slate-400 italic">
            By subscribing, you agree to our Terms of Use and Privacy Policy.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
