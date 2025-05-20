import { Link } from 'react-router-dom';
import { XMarkIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const CartPage = () => {
  // Sample cart data
  const cartItems = [
    {
      id: 1,
      name: 'Luxe Sateen Pillow Set',
      price: 126.65,
      originalPrice: 149.00,
      color: 'Sage',
      size: 'Standard',
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1616627561839-074385245ff6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 2,
      name: 'Classic Percale Curtains',
      price: 118.15,
      originalPrice: 139.00,
      color: 'Navy',
      size: '84" Length',
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 3,
      name: 'Silk Pillowcases',
      price: 126.65,
      originalPrice: 149.00,
      color: 'Blush',
      size: 'Queen',
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1616627561839-074385245ff6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    }
  ];

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  const shipping = subtotal > 200 ? 0 : 15.00;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-gradient-to-b from-rose-50 to-white min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="flex items-center text-rose-700 hover:text-rose-800">
            <ArrowLeftIcon className="h-5 w-5 mr-1" />
            <span className="font-medium">Continue Shopping</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <div className="w-24"></div> {/* Spacer for alignment */}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="hidden md:grid grid-cols-12 gap-4 border-b border-gray-200 pb-4 mb-4">
                <div className="col-span-5 font-medium text-gray-500">PRODUCT</div>
                <div className="col-span-2 font-medium text-gray-500">PRICE</div>
                <div className="col-span-3 font-medium text-gray-500">QUANTITY</div>
                <div className="col-span-2 font-medium text-gray-500 text-right">TOTAL</div>
              </div>

              {cartItems.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b border-gray-100 py-6 group">
                  <div className="md:col-span-5 flex items-start">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden mr-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <button className="absolute top-0 right-0 bg-white rounded-full p-1 shadow-md transform translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <XMarkIcon className="h-4 w-4 text-gray-500 hover:text-rose-600" />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{item.color} • {item.size}</p>
                    </div>
                  </div>

                  <div className="md:col-span-2 flex items-center">
                    <div>
                      <p className="font-medium text-gray-900">${item.price.toFixed(2)}</p>
                      {item.price < item.originalPrice && (
                        <p className="text-sm text-gray-500 line-through">${item.originalPrice.toFixed(2)}</p>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-3 flex items-center">
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button className="px-3 py-1 text-gray-500 hover:text-rose-600">
                        -
                      </button>
                      <span className="px-3 py-1 border-x border-gray-200">{item.quantity}</span>
                      <button className="px-3 py-1 text-gray-500 hover:text-rose-600">
                        +
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-2 flex items-center justify-end">
                    <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>

                  {/* Mobile remove button */}
                  <div className="md:hidden flex justify-end">
                    <button className="text-gray-400 hover:text-rose-600">
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Empty state */}
              {cartItems.length === 0 && (
                <div className="py-16 text-center">
                  <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-600 mb-6">Browse our collections to find something you'll love</p>
                  <Link
                    to="/products"
                    className="inline-block bg-gradient-to-r from-rose-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium"
                  >
                    Continue Shopping
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 border-b border-gray-200 pb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Savings</span>
                  <span className="text-green-600">-${savings.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center py-6">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-rose-700">${total.toFixed(2)}</span>
              </div>

              <button
                className="w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white py-4 rounded-lg hover:opacity-90 transition-opacity font-medium text-lg"
              >
                Proceed to Checkout
              </button>

              <div className="mt-4 flex items-center justify-center">
                <span className="text-gray-500 mr-1">or</span>
                <Link to="/products" className="text-rose-700 hover:text-rose-800 font-medium">
                  Continue Shopping
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">We Accept</h3>
                <div className="flex space-x-4">
                  <div className="w-12 h-8 bg-gray-100 rounded-md"></div>
                  <div className="w-12 h-8 bg-gray-100 rounded-md"></div>
                  <div className="w-12 h-8 bg-gray-100 rounded-md"></div>
                  <div className="w-12 h-8 bg-gray-100 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        {cartItems.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="group">
                  <div className="aspect-square bg-gray-100 rounded-xl mb-3 overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/photo-1616627561839-074385245ff6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80&${item}`}
                      alt="Recommended product"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-medium text-gray-900">Premium Pillow {item}</h3>
                  <p className="text-gray-600">${(49 + item * 10).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;