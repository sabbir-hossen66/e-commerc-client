"use client";
import React, { useMemo, useState } from "react";
import { mockProducts } from "../data";

// Mock data - replace with API later


const Product = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortType>("featured");

  const categories = [
    { id: "all", name: "All Products", count: mockProducts.length },
    { id: "t-shirt", name: "T-Shirts", count: mockProducts.filter(p => p.category === "t-shirt").length },
    { id: "jacket", name: "Jackets", count: mockProducts.filter(p => p.category === "jacket").length },
    { id: "dress", name: "Dresses", count: mockProducts.filter(p => p.category === "dress").length },
    { id: "jeans", name: "Jeans", count: mockProducts.filter(p => p.category === "jeans").length },
    { id: "bag", name: "Bags", count: mockProducts.filter(p => p.category === "bag").length },
  ];

  // Modern sorting with updated JavaScript features
  type SortType =
    | "price-low"
    | "price-high"
    | "rating"
    | "discount"
    | "name"
    | "popularity"
    | "featured"
    | "newest";

  const sortProducts = (products: typeof mockProducts, sortType: SortType) => {
    const sortFunctions: Record<SortType, (a: typeof mockProducts[number], b: typeof mockProducts[number]) => number> = {
      "price-low": (a, b) => a.price - b.price,
      "price-high": (a, b) => b.price - a.price,
      "rating": (a, b) => b.rating - a.rating,
      "discount": (a, b) => b.discount - a.discount,
      "name": (a, b) => a.name.localeCompare(b.name),
      "popularity": (a, b) => b.reviews - a.reviews,
      "featured": (a, b) => Number(b.featured) - Number(a.featured) || a.id - b.id, // Featured first, then by ID
      "newest": (a, b) => b.id - a.id, // Assuming higher ID = newer
    };

    return [...products].sort(sortFunctions[sortType] ?? sortFunctions.featured);
  };

  // Filter and sort products using modern approach
  const filteredProducts = useMemo(() => {
    const filtered = mockProducts.filter(product => {
      const searchTerm = searchQuery.toLowerCase();
      const matchesSearch = [
        product.name,
        product.category,
        ...product.tags
      ].some(field => field.toLowerCase().includes(searchTerm));
      
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    return sortProducts(filtered, sortBy);
  }, [searchQuery, selectedCategory, sortBy]);

  type Product = typeof mockProducts[number];

  const ProductCard = ({ product }: { product: Product }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 transform hover:-translate-y-1">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-100">
        <div className="w-full h-48 flex items-center justify-center relative">
          <div className="text-6xl">
            {product.category === 't-shirt' ? '👕' : 
             product.category === 'jacket' ? '🧥' : 
             product.category === 'dress' ? '👗' : 
             product.category === 'jeans' ? '👖' : '👜'}
          </div>
          {product.discount > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
              -{product.discount}%
            </div>
          )}
          {product.featured && (
            <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              ⭐ Featured
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-yellow-600 transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-500">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-gray-800">${product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.tags.slice(0, 2).map((tag: string, index: number) => (
            <span key={index} className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <button 
          disabled={!product.inStock}
          className={`w-full py-2 px-4 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 cursor-pointer ${
            product.inStock 
              ? 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-md hover:shadow-lg' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {product.inStock ? 'View Detail' : '❌ Out of Stock'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">🛍️ Our Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Find your perfect style from our curated collection of premium fashion items
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="🔍 Search for t-shirts, jackets, dresses, premium, casual..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-yellow-500 focus:ring-opacity-20 focus:border-yellow-500 outline-none text-gray-700 bg-white shadow-lg text-lg"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8 justify-between items-start lg:items-center bg-white p-6 rounded-2xl shadow-lg">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-3 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                  selectedCategory === category.id
                    ? 'bg-yellow-500 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent hover:border-yellow-300'
                }`}
              >
                {category.name} <span className="bg-white bg-opacity-30 px-2 py-0.5 rounded-full ml-1 text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-600">📊 Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-500 focus:ring-opacity-20 focus:border-yellow-500 outline-none text-sm bg-white font-medium min-w-[160px]"
            >
              <option value="featured">⭐ Featured</option>
              <option value="price-low">💰 Price: Low to High</option>
              <option value="price-high">💎 Price: High to Low</option>
              <option value="rating">⭐ Highest Rated</option>
              <option value="discount">🔥 Best Discount</option>
              <option value="name">🔤 Name A-Z</option>
              <option value="popularity">📈 Most Popular</option>
              <option value="newest">🆕 Newest First</option>
            </select>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 bg-white p-4 rounded-xl shadow-sm">
          <p className="text-gray-700 font-medium">
            🎯 <span className="font-bold text-yellow-600">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'product' : 'products'} found
            {searchQuery && (
              <span className="ml-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                for &quot;{searchQuery}&quot;
              </span>
            )}
          </p>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="text-8xl mb-6">😔</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">No products found</h3>
            <p className="text-gray-500 text-lg mb-6">
              Try adjusting your search or filters to find what you are looking for.
            </p>
            <button 
              onClick={() => {setSearchQuery(""); setSelectedCategory("all");}}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              🔄 Reset Filters
            </button>
          </div>
        )}

        {/* Load More Button */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer">
             Load More Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;