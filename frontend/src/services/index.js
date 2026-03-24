import api from './api';

const MEN_IMAGES = [
  '/images/imgMen/Men0.jpg',
  '/images/imgMen/Men1.jpg',
  '/images/imgMen/Men2.jpg',
  '/images/imgMen/Men3.jpg',
  '/images/imgMen/Men4.jpg',
  '/images/imgMen/Men5.jpg',
  '/images/imgMen/Men6.jpg',
  '/images/imgMen/Men7.jpg',
  '/images/imgMen/Men8.jpg',
  '/images/imgMen/Men9.jpg',
  '/images/imgMen/Men10.jpg',
  '/images/imgMen/Men11.jpg',
  '/images/imgMen/Men12.jpg',
  '/images/imgMen/Men13.jpg',
  '/images/imgMen/Men14.jpg',
  '/images/imgMen/Men15.jpg',
  '/images/imgMen/Men16.jpg',
  '/images/imgMen/Men17.jpg',
  '/images/imgMen/Men18.jpg',
  '/images/imgMen/Men19.jpg',
  '/images/imgMen/Men20.jpg',
  '/images/imgMen/Men21.jpg',
  '/images/imgMen/Men22.jpg',
  '/images/imgMen/Men23.jpg',
];

const WOMEN_IMAGES = [
  '/images/imgWomen/Women1.webp',
  '/images/imgWomen/Women2.webp',
  '/images/imgWomen/Women3.webp',
  '/images/imgWomen/Women4.webp',
  '/images/imgWomen/Women5.webp',
  '/images/imgWomen/Women6.webp',
  '/images/imgWomen/Women7.webp',
  '/images/imgWomen/Women8.webp',
  '/images/imgWomen/Women9.webp',
  '/images/imgWomen/Women10.webp',
  '/images/imgWomen/Women11.webp',
  '/images/imgWomen/Women12.webp',
  '/images/imgWomen/Women13.webp',
  '/images/imgWomen/Women14.webp',
  '/images/imgWomen/Women15.webp',
  '/images/imgWomen/Women16.webp',
  '/images/imgWomen/Women17.webp',
  '/images/imgWomen/Women18.webp',
  '/images/imgWomen/Women19.webp',
  '/images/imgWomen/Women20.webp',
  '/images/imgWomen/Women21.webp',
  '/images/imgWomen/Women22.webp',
  '/images/imgWomen/Women23.webp',
  '/images/imgWomen/Women24.webp',
];

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Classic Wool Blazer',
    category: 'Outerwear',
    price: 245,
    gender: 'men',
    image: MEN_IMAGES[0],
    is_new: true,
  },
  {
    id: 2,
    name: 'Slim Fit Chinos',
    category: 'Bottoms',
    price: 89,
    gender: 'men',
    image: MEN_IMAGES[1],
    is_new: true,
  },
  {
    id: 3,
    name: 'Oxford Button-Down',
    category: 'Shirts',
    price: 75,
    gender: 'men',
    image: MEN_IMAGES[2],
  },
  {
    id: 4,
    name: 'Merino Wool Sweater',
    category: 'Knitwear',
    price: 120,
    gender: 'men',
    image: MEN_IMAGES[3],
    is_new: true,
  },
  {
    id: 5,
    name: 'Leather Belt',
    category: 'Accessories',
    price: 55,
    gender: 'men',
    image: MEN_IMAGES[4],
  },
  {
    id: 6,
    name: 'Silk Blouse',
    category: 'Tops',
    price: 145,
    gender: 'women',
    image: WOMEN_IMAGES[0],
    is_new: true,
  },
  {
    id: 7,
    name: 'High-Waist Jeans',
    category: 'Bottoms',
    price: 120,
    gender: 'women',
    image: WOMEN_IMAGES[1],
  },
  {
    id: 8,
    name: 'Cashmere Cardigan',
    category: 'Knitwear',
    price: 195,
    gender: 'women',
    image: WOMEN_IMAGES[2],
    is_new: true,
  },
  {
    id: 9,
    name: 'Leather Handbag',
    category: 'Accessories',
    price: 280,
    gender: 'women',
    image: WOMEN_IMAGES[3],
  },
  {
    id: 10,
    name: 'Wrap Dress',
    category: 'Dresses',
    price: 165,
    gender: 'women',
    image: WOMEN_IMAGES[4],
  },
  {
    id: 11,
    name: 'Wool Overcoat',
    category: 'Outerwear',
    price: 350,
    gender: 'men',
    image: MEN_IMAGES[6],
  },
  {
    id: 12,
    name: 'Denim Jacket',
    category: 'Outerwear',
    price: 150,
    gender: 'men',
    image: MEN_IMAGES[7],
  },
  {
    id: 13,
    name: 'Tailored Blazer',
    category: 'Outerwear',
    price: 225,
    gender: 'women',
    image: WOMEN_IMAGES[5],
  },
  {
    id: 14,
    name: 'Wool Coat',
    category: 'Outerwear',
    price: 320,
    gender: 'women',
    image: WOMEN_IMAGES[6],
  },
  {
    id: 15,
    name: 'Linen Trousers',
    category: 'Bottoms',
    price: 95,
    gender: 'men',
    image: MEN_IMAGES[9],
  },
  {
    id: 16,
    name: 'Midi Skirt',
    category: 'Bottoms',
    price: 95,
    gender: 'women',
    image: WOMEN_IMAGES[7],
  },
  {
    id: 17,
    name: 'Leather Chelsea Boots',
    category: 'Footwear',
    price: 220,
    gender: 'men',
    image: MEN_IMAGES[10],
  },
  {
    id: 18,
    name: 'Ankle Boots',
    category: 'Footwear',
    price: 180,
    gender: 'women',
    image: WOMEN_IMAGES[8],
  },
  {
    id: 19,
    name: 'Cotton Crew Neck Tee',
    category: 'T-Shirts',
    price: 35,
    gender: 'men',
    image: MEN_IMAGES[11],
  },
  {
    id: 20,
    name: 'Linen Blouse',
    category: 'Tops',
    price: 89,
    gender: 'women',
    image: WOMEN_IMAGES[9],
  },
  {
    id: 21,
    name: 'Cashmere Scarf',
    category: 'Accessories',
    price: 85,
    gender: 'men',
    image: MEN_IMAGES[12],
  },
  {
    id: 22,
    name: 'Silk Scarf',
    category: 'Accessories',
    price: 75,
    gender: 'women',
    image: WOMEN_IMAGES[10],
  },
  {
    id: 23,
    name: 'Suede Loafers',
    category: 'Footwear',
    price: 165,
    gender: 'men',
    image: MEN_IMAGES[13],
  },
  {
    id: 24,
    name: 'Leather Tote',
    category: 'Accessories',
    price: 245,
    gender: 'women',
    image: WOMEN_IMAGES[11],
  },
];

const MOCK_CART = { items: [], total: 0 };

export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock login');
      return { user: { id: 1, email, name: 'Demo User' }, token: 'mock_token' };
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock register');
      return { user: { id: 1, ...userData }, token: 'mock_token' };
    }
  },

  logout: async () => {
    localStorage.removeItem('auth_token');
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      return { id: 1, name: 'Demo User', email: 'demo@example.com' };
    }
  },

  isAuthenticated: () => !!localStorage.getItem('auth_token'),
};

export const productService = {
  getProducts: async (params = {}) => {
    try {
      const response = await api.get('/products', { params });
      const data = response.data;
      
      if (data && Array.isArray(data.data)) {
        return { data: data.data, meta: data };
      }
      
      return { data: data.data || data, meta: data.meta };
    } catch (error) {
      console.warn('API not available, using mock products', error.message);
      let filtered = [...MOCK_PRODUCTS];
      if (params.category) {
        const cat = params.category.toLowerCase();
        if (cat === 'men' || cat === 'women') {
          filtered = filtered.filter(p => p.gender === cat);
        } else {
          filtered = filtered.filter(p => p.category.toLowerCase().includes(cat));
        }
      }
      if (params.q) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(params.q.toLowerCase()));
      }
      return { data: filtered, meta: { total: filtered.length, current_page: 1, last_page: 1 } };
    }
  },

  getProduct: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock product');
      const product = MOCK_PRODUCTS.find(p => p.id === parseInt(id));
      return {
        data: product || {
          id,
          name: 'Premium Tailored Linen Shirt',
          price: 129,
          description: 'Meticulously crafted from the finest European flax, our Premium Tailored Linen Shirt offers an unmatched combination of luxury and breathability.',
          category: 'Shirts',
          rating: 4.8,
          reviews: 215,
          image: MEN_IMAGES[0],
          images: [MEN_IMAGES[0], MEN_IMAGES[1]]
        }
      };
    }
  },

  getCategories: async () => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      return { data: [
        { id: 1, name: 'Men', slug: 'men' },
        { id: 2, name: 'Women', slug: 'women' },
        { id: 3, name: 'Accessories', slug: 'accessories' }
      ]};
    }
  },

  getFeaturedProducts: async () => {
    try {
      const response = await api.get('/products/featured');
      return response.data;
    } catch (error) {
      return { data: MOCK_PRODUCTS.slice(0, 3) };
    }
  },

  getTrendingProducts: async () => {
    try {
      const response = await api.get('/products/trending');
      return response.data;
    } catch (error) {
      return { data: MOCK_PRODUCTS };
    }
  },
};

export const cartService = {
  getCart: async () => {
    try {
      const response = await api.get('/cart');
      return response.data;
    } catch (error) {
      const stored = localStorage.getItem('mock_cart');
      return stored ? JSON.parse(stored) : MOCK_CART;
    }
  },

  addToCart: async (productId, quantity = 1, size = null, color = null) => {
    try {
      const response = await api.post('/cart/add', { product_id: productId, quantity, size, color });
      return response.data;
    } catch (error) {
      const stored = localStorage.getItem('mock_cart');
      let cart = stored ? JSON.parse(stored) : { items: [] };
      const product = MOCK_PRODUCTS.find(p => p.id === parseInt(productId));
      const existing = cart.items.find(i => i.product_id === productId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.items.push({
          id: Date.now(),
          product_id: productId,
          name: product?.name || 'Unknown Product',
          image: product?.image || null,
          quantity,
          size,
          color,
          price: product?.price || 100,
        });
      }
      localStorage.setItem('mock_cart', JSON.stringify(cart));
      return cart;
    }
  },

  updateCartItem: async (itemId, quantity) => {
    try {
      const response = await api.put(`/cart/${itemId}`, { quantity });
      return response.data;
    } catch (error) {
      const stored = localStorage.getItem('mock_cart');
      let cart = stored ? JSON.parse(stored) : { items: [] };
      const item = cart.items.find(i => i.id === itemId);
      if (item) item.quantity = quantity;
      localStorage.setItem('mock_cart', JSON.stringify(cart));
      return cart;
    }
  },

  removeFromCart: async (itemId) => {
    try {
      const response = await api.delete(`/cart/${itemId}`);
      return response.data;
    } catch (error) {
      const stored = localStorage.getItem('mock_cart');
      let cart = stored ? JSON.parse(stored) : { items: [] };
      cart.items = cart.items.filter(i => i.id !== itemId);
      localStorage.setItem('mock_cart', JSON.stringify(cart));
      return cart;
    }
  },

  clearCart: async () => {
    try {
      await api.delete('/cart/clear');
    } finally {
      localStorage.setItem('mock_cart', JSON.stringify({ items: [] }));
    }
  },
};

export const orderService = {
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      localStorage.removeItem('mock_cart');
      return { success: true, order_id: 'ORD-' + Date.now() };
    }
  },

  getOrders: async () => {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (error) {
      return { data: [] };
    }
  },

  getOrder: async (id) => {
    try {
      const response = await api.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      return { data: null };
    }
  },
};

export default api;
