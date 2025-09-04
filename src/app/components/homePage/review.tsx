"use client"
"use client";
import React, { useState, useEffect } from "react";
import { mockReviews } from "../data";

// Mock reviews data - replace with API later

const ReviewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-scroll carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => 
        prev === mockReviews.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Navigation functions
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToPrevious = () => {
    setCurrentIndex(prev => prev === 0 ? mockReviews.length - 1 : prev - 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToNext = () => {
    setCurrentIndex(prev => prev === mockReviews.length - 1 ? 0 : prev + 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Calculate average rating
  const averageRating = (mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length).toFixed(1);

  const StarRating = ({ rating, size = "text-lg" }: { rating: number; size?: string }) => (
    <div className={`flex ${size}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          } transition-colors duration-200`}
        >
          ★
        </span>
      ))}
    </div>
  );

  const ReviewCard = ({ review, isActive }: { review: typeof mockReviews[0]; isActive: boolean }) => (
    <div className={`transition-all duration-500 transform ${
      isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-70'
    }`}>
      <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-2xl shadow-lg">
              {review.avatar}
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                {review.name}
                {review.verified && (
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    ✓ Verified
                  </span>
                )}
              </h4>
              <p className="text-sm text-gray-500">{review.location}</p>
              <div className="flex items-center gap-2 mt-1">
                <StarRating rating={review.rating} size="text-sm" />
                <span className="text-xs text-gray-400">
                  {new Date(review.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Review Content */}
        <div className="mb-6">
          <p className="text-gray-700 text-lg leading-relaxed italic">
            `{review.comment}`
          </p>
        </div>

        {/* Product Info */}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Product reviewed:</p>
              <p className="font-semibold text-gray-800">{review.product}</p>
            </div>
            <div className="bg-yellow-50 px-3 py-2 rounded-full">
              <StarRating rating={review.rating} size="text-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Customer Reviews
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Do not just take our word for it. Here is what our satisfied customers have to say about their experience.
          </p>
          
          {/* Overall Rating */}
          <div className="flex items-center justify-center gap-6 bg-white rounded-2xl p-6 max-w-md mx-auto shadow-lg">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-1">{averageRating}</div>
              <StarRating rating={parseFloat(averageRating)} size="text-xl" />
              <p className="text-sm text-gray-500 mt-2">Based on {mockReviews.length} reviews</p>
            </div>
            <div className="w-px h-16 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-500 mb-1">{mockReviews.length}</div>
              <p className="text-sm font-semibold text-gray-700">Happy</p>
              <p className="text-sm text-gray-500">Customers</p>
            </div>
          </div>
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-yellow-50 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <svg className="w-6 h-6 text-gray-600 group-hover:text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-yellow-50 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <svg className="w-6 h-6 text-gray-600 group-hover:text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Review Cards */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {mockReviews.map((review, index) => (
                <div key={review.id} className="w-full flex-shrink-0 px-4">
                  <ReviewCard 
                    review={review} 
                    isActive={index === currentIndex}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {mockReviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-yellow-500 scale-125' 
                    : 'bg-gray-300 hover:bg-yellow-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏆</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Guaranteed</h3>
            <p className="text-gray-600 text-sm">Premium materials and craftsmanship in every product</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚚</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Shipping</h3>
            <p className="text-gray-600 text-sm">Quick and secure delivery to your doorstep</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
            <p className="text-gray-600 text-sm">Friendly customer service whenever you need help</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">Join thousands of satisfied customers!</p>
          <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Shop Now & Leave Your Review
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;