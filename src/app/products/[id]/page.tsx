// app/products/[id]/page.tsx
"use client";
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { mockProducts } from '@/app/components/data';
// Adjust path based on your data.ts location

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

const ProductDetail = () => {
  const params = useParams();
  const id = params.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      // Find product from mockProducts
      const foundProduct = mockProducts.find((p: Product) => p.id === parseInt(id));
      setProduct(foundProduct || null);
      setLoading(false);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      console.log(`Added ${quantity} of product ${product.id} to cart`);
      // Add your cart logic here
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-500 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center bg-white p-12 rounded-2xl shadow-xl">
          <div className="text-8xl mb-6">😔</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-8 text-lg">The product you are looking for doesnt exist or has been removed.</p>
          <Link href="/">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              🏠 Back to Products
            </button>
          </Link>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-yellow-600 hover:text-yellow-800 font-semibold text-lg transition-colors flex items-center gap-2">
              ← Back to Products
            </Link>
            <div className="text-gray-600">
              Product Details
            </div>
          </div>
        </div>
      </nav>

      {/* Product Detail Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            
            {/* Product Image Section */}
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 p-12 flex items-center justify-center">
              <div className="text-center">
                <div className="text-9xl mb-6 drop-shadow-lg">
                  {getProductEmoji(product.category)}
                </div>
                
                {/* Badges */}
                <div className="flex flex-wrap gap-3 justify-center mb-6">
                  {product.discount > 0 && (
                    <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                      🔥 -{product.discount}% OFF
                    </div>
                  )}
                  {product.featured && (
                    <div className="bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      ⭐ Featured
                    </div>
                  )}
                  {product.inStock ? (
                    <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                       In Stock
                    </div>
                  ) : (
                    <div className="bg-gray-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      ❌ Out of Stock
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Product Information Section */}
            <div className="p-8 lg:p-12">
              
              {/* Category & Brand */}
              <div className="mb-6">
                <span className="text-sm text-yellow-600 font-semibold uppercase tracking-wider bg-yellow-100 px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>

              {/* Product Name */}
              <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex text-yellow-400 text-lg">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-gray-600 font-medium">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.originalPrice > product.price && (
                  <div className="flex items-center gap-2">
                    <span className="text-xl text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-bold">
                      Save ${product.originalPrice - product.price}
                    </span>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag: string, index: number) => (
                    <span key={index} className="bg-yellow-100 text-yellow-700 px-3 py-2 rounded-full text-sm font-medium hover:bg-yellow-200 transition-colors">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quantity and Actions */}
              {product.inStock ? (
                <div className="space-y-6">
                  {/* Quantity Selector */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Quantity
                    </label>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-12 h-12 rounded-xl border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-yellow-400 transition-all text-xl font-bold"
                      >
                        -
                      </button>
                      <span className="text-2xl font-bold w-16 text-center bg-gray-50 py-2 rounded-xl">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-12 h-12 rounded-xl border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-yellow-400 transition-all text-xl font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                  >
                    🛒 Add to Cart
                  </button>

                  {/* Additional Actions */}
                  <div className="grid grid-cols-2 gap-4">
                    <button className="border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-50 hover:border-yellow-400 transition-all font-semibold">
                      💝 Add to Wishlist
                    </button>
                    <button className="border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-50 hover:border-yellow-400 transition-all font-semibold">
                      📤 Share
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-100 border-2 border-gray-300 rounded-2xl p-6 text-center">
                  <div className="text-4xl mb-3">😞</div>
                  <span className="text-gray-600 font-semibold text-lg block mb-2">
                    Currently Out of Stock
                  </span>
                  <p className="text-sm text-gray-500">
                    This item is currently unavailable. Check back later or browse similar products.
                  </p>
                  <button className="mt-4 bg-gray-300 text-gray-600 py-2 px-6 rounded-xl font-semibold">
                    📧 Notify When Available
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🔍 Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProducts
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((similarProduct) => (
                <Link key={similarProduct.id} href={`/products/${similarProduct.id}`}>
                  <div className="bg-gray-50 rounded-xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer hover:bg-gray-100">
                    <div className="text-4xl text-center mb-3">
                      {getProductEmoji(similarProduct.category)}
                    </div>
                    <h4 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2">
                      {similarProduct.name}
                    </h4>
                    <div className="text-lg font-bold text-yellow-600">
                      ${similarProduct.price}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;