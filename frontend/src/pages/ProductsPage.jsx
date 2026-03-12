import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { FaChevronRight, FaFilter } from 'react-icons/fa';
import { Button, ProductCard, Loading, Error } from '../components/ui';
import { productService } from '../services';
import { useCart } from '../context/CartContext';

const ProductsPage = ({ category: categoryProp }) => {
  const { category: categoryParam } = useParams();
  const category = categoryParam || categoryProp;
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1, total: 0 });
  
  const [filters, setFilters] = useState({
    sizes: searchParams.get('size') ? [searchParams.get('size')] : [],
    colors: searchParams.get('color') ? [searchParams.get('color')] : [],
    priceRange: searchParams.get('price') || '',
    sort: searchParams.get('sort') || 'newest',
  });
  
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { addItem } = useCart();

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colors = [
    { name: 'White', value: 'white', hex: '#ffffff' },
    { name: 'Black', value: 'black', hex: '#1e293b' },
    { name: 'Beige', value: 'beige', hex: '#d4d4d4' },
    { name: 'Blue', value: 'blue', hex: '#1e3a8a' },
    { name: 'Gray', value: 'gray', hex: '#9ca3af' },
  ];
  const priceRanges = [
    { label: '$0 - $50', value: '0-50' },
    { label: '$50 - $150', value: '50-150' },
    { label: '$150 - $300', value: '150-300' },
    { label: '$300+', value: '300+' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {
          page: pagination.current_page,
          category: category || undefined,
          sizes: filters.sizes.join(','),
          colors: filters.colors.join(','),
          price_min: filters.priceRange ? filters.priceRange.split('-')[0] : undefined,
          price_max: filters.priceRange ? filters.priceRange.split('-')[1] : undefined,
          sort: filters.sort,
          q: searchParams.get('q'),
        };
        
        const response = await productService.getProducts(params);
        setProducts(response.data || response);
        if (response.meta) {
          setPagination({
            current_page: response.meta.current_page || 1,
            last_page: response.meta.last_page || 1,
            total: response.meta.total || 0,
          });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [category, filters, pagination.current_page, searchParams]);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      if (type === 'sizes' || type === 'colors') {
        const current = prev[type];
        const updated = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value];
        return { ...prev, [type]: updated };
      }
      return { ...prev, [type]: value };
    });
    setPagination((prev) => ({ ...prev, current_page: 1 }));
  };

  const handleAddToCart = async (productId) => {
    try {
      await addItem(productId, 1);
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  const getPageTitle = () => {
    if (searchParams.get('q')) return `Search: "${searchParams.get('q')}"`;
    if (category === 'men') return "Men's Collection";
    if (category === 'women') return "Women's Collection";
    if (category === 'accessories') return 'Accessories';
    if (searchParams.get('sale')) return 'Sale';
    return 'Shop All';
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-16 py-12">
      {/* Breadcrumbs & Title */}
      <div className="mb-12">
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
          <a href="/" className="hover:text-primary transition-colors">Home</a>
          <FaChevronRight className="text-xs" />
          <span className="text-slate-900 dark:text-slate-100 font-medium">{getPageTitle()}</span>
        </nav>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight mb-3">{getPageTitle()}</h1>
            <p className="text-lg text-slate-500 max-w-2xl">
              {category === 'women'
                ? "Refined wardrobe staples designed for the modern woman. Discover our curated selection of timeless essentials and seasonal silhouettes."
                : category === 'men'
                ? "Refined wardrobe essentials for the modern man. Quality craftsmanship meets contemporary design."
                : "Explore our curated collection of minimalist fashion for the modern lifestyle."}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-500">{pagination.total} Products</span>
            <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2 bg-white dark:bg-slate-900 cursor-pointer hover:border-primary transition-all">
              <span className="text-sm font-semibold">Sort by:</span>
              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="bg-transparent border-none text-sm font-semibold focus:outline-none"
              >
                <option value="newest">Newest</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="md:hidden flex items-center gap-2 border border-slate-200 rounded-lg px-4 py-2"
            >
              <FaFilter /> Filters
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className={`w-full lg:w-64 flex-shrink-0 space-y-8 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6">Filter By</h3>
            
            {/* Size Filter */}
            <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-6">
              <div className="flex items-center justify-between mb-4 group cursor-pointer">
                <span className="font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">straighten</span> Size
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleFilterChange('sizes', size)}
                    className={`h-10 border rounded-lg text-xs font-bold transition-all uppercase ${
                      filters.sizes.includes(size)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-slate-200 dark:border-slate-800 hover:border-primary hover:text-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">palette</span> Color
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => handleFilterChange('colors', color.value)}
                    title={color.name}
                    className={`w-8 h-8 rounded-full cursor-pointer ring-offset-2 transition-all ${
                      filters.colors.includes(color.value) ? 'ring-2 ring-primary' : 'hover:ring-2 hover:ring-primary'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">sell</span> Price
                </span>
              </div>
              <div className="space-y-3">
                {priceRanges.map((range) => (
                  <label key={range.value} className="flex items-center gap-3 text-sm cursor-pointer group">
                    <input
                      type="radio"
                      name="price"
                      value={range.value}
                      checked={filters.priceRange === range.value}
                      onChange={() => handleFilterChange('priceRange', range.value)}
                      className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    <span className="text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors">
                      {range.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {loading ? (
            <Loading text="Loading products..." />
          ) : error ? (
            <Error message={error} onRetry={() => window.location.reload()} />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
                {products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-20">
                    <h3 className="text-2xl font-bold mb-2">No products found</h3>
                    <p className="text-slate-500">Try adjusting your filters or search criteria.</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {pagination.last_page > 1 && (
                <div className="mt-20 flex flex-col items-center gap-6">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPagination((prev) => ({ ...prev, current_page: prev.current_page - 1 }))}
                      disabled={pagination.current_page === 1}
                      className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:border-primary hover:text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      &lt;
                    </button>
                    {Array.from({ length: pagination.last_page }, (_, i) => i + 1)
                      .filter((page) => {
                        const diff = Math.abs(page - pagination.current_page);
                        return diff === 0 || diff === 1 || page === 1 || page === pagination.last_page;
                      })
                      .map((page, index, array) => (
                        <span key={page}>
                          {index > 0 && array[index - 1] !== page - 1 && <span className="mx-2 text-slate-400">...</span>}
                          <button
                            onClick={() => setPagination((prev) => ({ ...prev, current_page: page }))}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold transition-all ${
                              pagination.current_page === page
                                ? 'bg-primary text-white'
                                : 'border border-slate-200 dark:border-slate-800 hover:border-primary hover:text-primary'
                            }`}
                          >
                            {page}
                          </button>
                        </span>
                      ))}
                    <button
                      onClick={() => setPagination((prev) => ({ ...prev, current_page: prev.current_page + 1 }))}
                      disabled={pagination.current_page === pagination.last_page}
                      className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:border-primary hover:text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      &gt;
                    </button>
                  </div>
                  <p className="text-sm text-slate-500">
                    Showing {((pagination.current_page - 1) * 12) + 1} to {Math.min(pagination.current_page * 12, pagination.total)} of {pagination.total} products
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
