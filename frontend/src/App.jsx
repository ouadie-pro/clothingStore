import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Layout } from './components/layout';
import {
  HomePage,
  ProductsPage,
  ProductDetailPage,
  CartPage,
  CheckoutPage,
  LoginPage,
  RegisterPage,
} from './pages';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ProductsPage />} />
              <Route path="/shop/:category" element={<ProductsPage />} />
              <Route path="/men" element={<ProductsPage category="men" />} />
              <Route path="/women" element={<ProductsPage category="women" />} />
              <Route path="/accessories" element={<ProductsPage category="accessories" />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
