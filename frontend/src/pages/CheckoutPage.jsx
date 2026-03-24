import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import { Button, Input } from '../components/ui';
import { useCart } from '../context/CartContext';
import { orderService } from '../services';

const CheckoutPage = () => {
  const { items, subtotal, tax, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    email: '',
    phone: '',
  });
  
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await orderService.createOrder({
        ...formData,
        shipping_method: shippingMethod,
        payment_method: paymentMethod,
        items: items.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          price: item.price,
        })),
      });
      
      await clearCart();
      window.location.href = '/order-confirmation';
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to process order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const shippingCost = shippingMethod === 'express' ? 15 : 0;
  const orderTotal = subtotal + tax + shippingCost;

  return (
    <div className="flex-1 flex flex-col items-center px-4 md:px-10 lg:px-40 py-8">
      <div className="w-full max-w-[1200px]">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-2 text-sm">
          <Link to="/cart" className="text-slate-400 hover:text-primary">Cart</Link>
          <span className="text-slate-300">›</span>
          <span className="text-slate-900 dark:text-slate-100 font-bold">Payment</span>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-8">Checkout</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold mb-4">Your cart is empty</h3>
            <Link to="/shop" className="text-primary hover:underline">Continue shopping</Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Side */}
            <div className="flex-1 space-y-10">
              {/* Shipping Address */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <h2 className="text-xl font-bold">Shipping Address</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="e.g. Alex"
                    required
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="e.g. Morgan"
                    required
                  />
                  <div className="md:col-span-2">
                    <Input
                      label="Address Line 1"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Street address or P.O. Box"
                      required
                    />
                  </div>
                  <Input
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                    required
                  />
                  <Input
                    label="Postal Code"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="10001"
                    required
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="alex@example.com"
                    required
                  />
                  <Input
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </section>

              {/* Shipping Method */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <h2 className="text-xl font-bold">Shipping Method</h2>
                </div>
                <div className="space-y-3">
                  <label
                    className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      shippingMethod === 'standard'
                        ? 'border-primary bg-primary/5'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="shipping"
                        value="standard"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                        className="text-primary focus:ring-primary"
                      />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-slate-100">Standard Delivery</p>
                        <p className="text-sm text-slate-500">Estimated 3-5 business days</p>
                      </div>
                    </div>
                    <span className="font-bold text-green-600">Free</span>
                  </label>
                  <label
                    className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      shippingMethod === 'express'
                        ? 'border-primary bg-primary/5'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="shipping"
                        value="express"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                        className="text-primary focus:ring-primary"
                      />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-slate-100">Express Shipping</p>
                        <p className="text-sm text-slate-500">Estimated 1-2 business days</p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-slate-100">$15.00</span>
                  </label>
                </div>
              </section>

              {/* Payment */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <h2 className="text-lg font-bold">Payment Details</h2>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple')}
                    className={`flex items-center justify-center gap-2 py-2 px-4 border rounded-lg transition-all ${
                      paymentMethod === 'apple'
                        ? 'border-primary bg-primary/5'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="material-symbols-outlined text-slate-900 dark:text-white">account_balance_wallet</span>
                    <span className="text-xs font-bold uppercase tracking-wider">Apple Pay</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`flex items-center justify-center gap-2 py-2 px-4 border rounded-lg transition-all ${
                      paymentMethod === 'paypal'
                        ? 'border-primary bg-primary/5'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="material-symbols-outlined text-primary">payments</span>
                    <span className="text-xs font-bold uppercase tracking-wider">PayPal</span>
                  </button>
                </div>

                <div className="relative flex py-4 items-center">
                  <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                  <span className="flex-shrink mx-4 text-slate-400 text-xs font-medium uppercase">Or Pay with Card</span>
                  <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                </div>

                <form className="space-y-4">
                  <Input
                    label="Card Number"
                    placeholder="0000 0000 0000 0000"
                    className="!pr-12"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      placeholder="MM / YY"
                    />
                    <Input
                      label="CVC"
                      placeholder="123"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="save-card"
                      className="rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="save-card" className="text-xs text-slate-500 font-medium">
                      Save card for future purchases
                    </label>
                  </div>
                </form>
              </section>
            </div>

            {/* Right Side - Order Summary */}
            <aside className="w-full lg:w-[400px] space-y-8">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-4">Order Summary</h3>
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-20 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || item.product?.image}
                          alt={item.name || item.product?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold truncate">{item.name || item.product?.name}</p>
                        <p className="text-xs text-slate-500">{item.size} / {item.color}</p>
                        <p className="text-sm font-bold mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-2">
                  <div className="flex justify-between text-slate-500 text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-sm">
                    <span>Shipping</span>
                    <span className={shippingCost === 0 ? 'text-green-600 font-medium' : ''}>
                      {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-sm">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-extrabold text-lg pt-2 text-slate-900 dark:text-slate-100">
                    <span>Total</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <Button
                onClick={handleSubmit}
                loading={loading}
                className="w-full py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg"
              >
                <FaLock />
                Complete Payment
              </Button>

              <p className="text-[10px] text-center text-slate-400 leading-relaxed">
                Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our{' '}
                <a href="#" className="underline">privacy policy</a>.
              </p>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
