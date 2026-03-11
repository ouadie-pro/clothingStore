import api from './api';

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Classic Camel Overcoat',
    category: 'Outerwear',
    price: 245,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgFOMS-PGlfR5Os2pcsD2dOk8xMAw6oBQN8g9fBgSA49ea7AylSoYZqKAOsdohRZuCUIeEHPAv--oWKcl3nUPmaRUkRnXIsT8pjTk78cikzBbZvWPB-Bn7-l9zYbEfmsPfm2u_JsqBfWe-3Wug9sglJMJKsIPD5K7ocEWObTA8-pRTR9dLiPDET_q_AiW1ZoaY5pyrKVDLAegXEuWYimiZIVg_amwEVeRhL9tzrctmhP92qyRlwY_-GF6Ns8aFzQ4bdy_0gQQrpf4',
  },
  {
    id: 2,
    name: 'Oversized Knit Sweater',
    category: 'Knitwear',
    price: 120,
    is_new: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlvW3uqI3S08Tk8fssl_fXSygF-F2cSOATE3kcEndGucEtEXOuIWqJJa9rhLA2touNEAvId4Pvhg59OpXwYzL6yWxlUR45SpT2UUBFpc4krBqs8DLjyw_JlAJ2yxqcEykIl55Uo93YKUNkpeFM4bbolk-_lXP6atgC4RNpm-QgLJUkoS3C7Kld8O9uULGpvGyUl2_R12U6j05cm2_Gliw9TnMlokbhJos2_Y5xLuuUA8nRNgMQHizfbMQtIx1UMy23if0W4qvE3Mk',
  },
  {
    id: 3,
    name: 'Handcrafted Leather Tote',
    category: 'Accessories',
    price: 380,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiUcpkK2XXKEHT0jZf1k8fTMcc_LynOpV55NL-Sfu3UisHFabzwiJbnzSi4UjjAAzWthgv2bt-3SnnalZL2tLORPU81sD1UHc2E1Cr7DR-r80vYZc5iRMA2-87bs7lc3wT_zMrJTnlcbnvttj5JTdyw21vMuVmIweud-3YmPc1yZCWab2nlRizYEvm9lrtjy0NqG-NV4s7HogPUyoRkgts8I8LY3y-oQvg9I4KxMXr1NV7M6tpj9sKI4XMZj4XGeNu_vmniMjkn5g',
  },
  {
    id: 4,
    name: 'Linen Blend Trousers',
    category: 'Bottoms',
    price: 155,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKnE_p2IyVHPJSCI2jE6uN3zB_LzguLoeubR1r6GtA4lpfBEDkbKFLNuLd8NXdTVTgtg4fr_HxF-zTOPN7pQSOSpNSFS-uN1Za7aLQxOUZMKnLAXmbI8C4KEh7QM52RRF071s6HPwiNf-UkVfJDU6maQSi5Xp3MDDIsUn1NmZt_RIALLiGfMq7efTaVV1XWRHSgiOiHnvanhi4Dmg2Ruh6E-Ec-6Cp23X8VaPQvLY-hExzKMN5LBpvZgpqEnysJpFKUZnYVClSga4',
  },
  {
    id: 5,
    name: 'Essential White Shirt',
    category: 'Shirts',
    price: 89,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv1N3XR4CN6s82ro3_aND_urmE-UwXvMNAbHyg8ba3WncSOZXZF0wqyZ4ILIDxYEBZ2uaKEiNJ513oSJpV1tUMoVKmOj_fFsybVZZQz61di5gOInOF_rE9x7V2dVbqC3TfF_p_uv8QwOpYcSnXv8YjTUbBLJN2hZngrSCOIU0n0MrKZt_cbw9LXF99bjjCAlH40mFa-qgH5KF6JvpzIXNei7SoRGsQ5NQjvur6gx2rji5pdTN6FzClAB7nV5wL-5bwRG5tkCgklXc',
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
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock products');
      let filtered = [...MOCK_PRODUCTS];
      if (params.category) {
        filtered = filtered.filter(p => p.category.toLowerCase().includes(params.category));
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
          images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCsGYdSTWVh-_ZjaldWwfrzqJM6NlPpZarxd3c-zhm5SIp_7Gd4tdvn4jybimGnC0ErfBqOHxaOF52q9aQOMNk416sSAz8q8yPKuvAGXewwJenccRzp1QblYIY0aAsr4r18Q1GVhCUX2nGrkYbavpGCzx2y-t8OW46ZkMxz22fFOENbDcI7417MS6K0_oTk-To7ad3aQlPxwtXdyLCAzxSCDzMneOgWJzDzxNmpaKF-SUy_q1UFooLUqpy7BfrY0nNR1TErwIv6PlA']
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
      const existing = cart.items.find(i => i.product_id === productId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.items.push({ id: Date.now(), product_id: productId, quantity, size, color, price: 100 });
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
