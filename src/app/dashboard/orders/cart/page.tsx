// src/app/dashboard/orders/cart/page.tsx

"use client";
import { useCartStore } from '@/store/cartStore';
import { mockProducts } from '@/app/components/data';
import { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';
import Link from 'next/link';
import Swal from "sweetalert2";
import CheckoutModal from '@/app/components/modal/checkoutModal';


interface CartItem {
  id: string;
  name: string;
  quantity: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  discount: number;
  featured: boolean;
  tags: string[];
}

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalItems } = useCartStore();
  const [showModal, setShowModal] = useState(false);

  // Get product details from mockProducts
  const getProductDetails = (itemId: string): Product | null => {
    return mockProducts.find((product: Product) => product.id === parseInt(itemId)) || null;
  };

  // Calculate totals
  const calculateSubtotal = () => {
    return items.reduce((total, item) => {
      const product = getProductDetails(item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over 50
  const total = subtotal + tax + shipping;

  const getProductEmoji = (category: string) => {
    const emojiMap: Record<string, string> = {
      't-shirt': '👕',
      'jacket': '🧥', 
      'dress': '👗',
      'jeans': '👖',
      'bag': '👜'
    };
    return emojiMap[category] || '👕';
  };

  const handleQuantityUpdate = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity);
  };

  const handleCheckout = async () => {
    setShowModal(true);
  };

  const handleOrderSuccess = () => {
    clearCart();
  };

  const handleClear = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove all items from your cart!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#FFC650",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
        Swal.fire("Deleted!", "Your cart has been cleared.", "success");
      }
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[600px] flex flex-col items-center justify-center px-4 py-8">
        <div className="text-center bg-white rounded-2xl shadow-lg p-8 sm:p-12 max-w-md w-full">
          <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">🛒</div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Your Cart is Empty</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
            Looks like you havent added any items to your cart yet.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105">
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
        {/* Page Header */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
                🛒 Shopping Cart
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <button
              onClick={handleClear}
              className="text-red-600 hover:text-red-800 hover:bg-red-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors font-medium text-sm sm:text-base self-start sm:self-auto"
            >
              Clear All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {items.map((item: CartItem) => {
              const product = getProductDetails(item.id);
              if (!product) return null;

              return (
                <div key={item.id} className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 hover:shadow-md transition-shadow">
                  {/* Mobile Layout */}
                  <div className="flex flex-col sm:hidden space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        {/* Product Image */}
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                          {getProductEmoji(product.category)}
                        </div>
                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-gray-800 line-clamp-2">
                            {product.name}
                          </h3>
                          <p className="text-xs text-gray-600 capitalize">
                            {product.category}
                          </p>
                        </div>
                      </div>
                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Price and Quantity Section */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-yellow-400 transition-all"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-semibold text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-yellow-400 transition-all"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-base font-bold text-gray-900">
                          {(product.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {product.price} each
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Desktop/Tablet Layout */}
                  <div className="hidden sm:flex items-center gap-4 lg:gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-2xl lg:text-3xl">
                        {getProductEmoji(product.category)}
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base lg:text-lg font-semibold text-gray-800 truncate">
                        {product.name}
                      </h3>
                      <p className="text-xs lg:text-sm text-gray-600 capitalize mb-1 lg:mb-2">
                        {product.category}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-base lg:text-lg font-bold text-gray-900">
                          {product.price}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-xs lg:text-sm text-gray-500 line-through">
                            {product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 lg:gap-3">
                      <button
                        onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)}
                        className="w-7 h-7 lg:w-8 lg:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-yellow-400 transition-all"
                      >
                        <Minus className="w-3 h-3 lg:w-4 lg:h-4" />
                      </button>
                      <span className="w-10 lg:w-12 text-center font-semibold text-base lg:text-lg">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                        className="w-7 h-7 lg:w-8 lg:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-yellow-400 transition-all"
                      >
                        <Plus className="w-3 h-3 lg:w-4 lg:h-4" />
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="text-base lg:text-lg font-bold text-gray-900">
                        {(product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 lg:p-2 rounded-lg transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4 lg:w-5 lg:h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 sticky top-4 lg:top-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
                📋 Order Summary
              </h2>

              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-semibold">{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? 'FREE' : `${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t pt-3 sm:pt-4">
                  <div className="flex justify-between text-base sm:text-lg">
                    <span className="font-bold text-gray-800">Total</span>
                    <span className="font-bold text-gray-900">{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {subtotal < 50 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                  <p className="text-xs sm:text-sm text-yellow-800">
                    💡 Add {(50 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}

              <button
                onClick={handleCheckout}
                className="w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white hover:shadow-xl"
              >
                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                Proceed to Checkout
              </button>

              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
                <Link
                 href={`/`}
                  className="block text-center text-yellow-600 hover:text-yellow-800 font-medium transition-colors text-sm sm:text-base"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal Component */}
      <CheckoutModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        items={items}
        getProductDetails={getProductDetails}
        subtotal={subtotal}
        tax={tax}
        shipping={shipping}
        total={total}
        onOrderSuccess={handleOrderSuccess}
      />
    </>
  );
};

export default CartPage;