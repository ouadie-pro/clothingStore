import { Link } from 'react-router-dom';
import { FaArrowLeft, FaShoppingCart, FaTrash, FaEdit } from 'react-icons/fa';
import { Button, Loading, Error } from '../components/ui';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { items, loading, error, updateItem, removeItem, subtotal, tax, total, itemCount } = useCart();

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    await updateItem(itemId, newQuantity);
  };

  const handleRemoveItem = async (itemId) => {
    await removeItem(itemId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" text="Loading cart..." />
      </div>
    );
  }

  if (error) {
    return <Error message={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-10 py-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>›</span>
        <span className="text-slate-900 dark:text-slate-100 font-medium">Shopping Cart</span>
      </nav>

      <h2 className="text-4xl font-black mb-10">
        Your Bag <span className="text-slate-400 font-medium text-2xl ml-2">({itemCount} Items)</span>
      </h2>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <FaShoppingCart className="text-6xl text-slate-300 mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-4">Your cart is empty</h3>
          <p className="text-slate-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/shop">
            <Button size="lg">Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-6 p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md"
              >
                <Link to={`/product/${item.product_id}`} className="w-full sm:w-32 h-40 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.image || item.product?.image || '/images/imgMen/Men0.jpg'}
                    alt={item.name || item.product?.name}
                    className="w-full h-full object-cover"
                  />
                </Link>
                
                <div className="flex flex-col flex-grow justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link to={`/product/${item.product_id}`}>
                        <h3 className="text-lg font-bold leading-tight hover:text-primary transition-colors">
                          {item.name || item.product?.name || 'Product'}
                        </h3>
                      </Link>
                      {item.color && (
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Color: {typeof item.color === 'object' ? item.color.name : item.color}</p>
                      )}
                      {item.size && (
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Size: {item.size}</p>
                      )}
                    </div>
                    <p className="text-xl font-bold text-primary">${((item.price || item.product?.price || 0) * item.quantity).toFixed(2)}</p>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 text-sm font-bold border-x border-slate-200 dark:border-slate-700">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="flex gap-4">
                      <button className="flex items-center gap-1 text-slate-400 hover:text-primary transition-colors text-sm font-semibold">
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="flex items-center gap-1 text-slate-400 hover:text-red-500 transition-colors text-sm font-semibold"
                      >
                        <FaTrash /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Link to="/shop" className="flex items-center gap-2 text-slate-500 hover:text-primary font-bold transition-colors group">
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <aside className="lg:col-span-4">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm sticky top-28">
              <h3 className="text-2xl font-bold mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Shipping estimation</span>
                  <span className="font-bold text-green-500">Free</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Tax estimation</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-6 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-3xl font-black text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Promo Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-grow bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary"
                  />
                  <Button variant="secondary">Apply</Button>
                </div>
              </div>

              <Link to="/checkout">
                <Button className="w-full py-4 rounded-xl text-lg flex items-center justify-center gap-2 shadow-lg">
                  Proceed to Checkout
                  <span>›</span>
                </Button>
              </Link>

              {/* Payment Icons */}
              <div className="mt-8 flex justify-center gap-4 text-slate-300 dark:text-slate-600">
                <span className="material-symbols-outlined text-4xl">credit_card</span>
                <span className="material-symbols-outlined text-4xl">payments</span>
                <span className="material-symbols-outlined text-4xl">account_balance_wallet</span>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default CartPage;
