"use client";
import React, { useState } from "react";
import { categories, clothingItems } from "../data";

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="relative bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 rounded-2xl mx-4 my-6 overflow-hidden shadow-2xl shadow-yellow-500/30">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full transform translate-x-32 -translate-y-32 rotate-45"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full transform -translate-x-24 translate-y-24"></div>
      
      <div className="relative z-10 px-6 py-12 lg:px-12">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto">
          {/* Text Section */}
          <div className="flex-1 text-center lg:text-left mb-8 lg:mb-0">
            {/* Sale Tag */}
       
            {/* Main Title */}
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-3 leading-tight drop-shadow-sm">
              Limited Time Offer!
            </h1>
            
            {/* Discount Text */}
            <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4">
              Up to 60% OFF!
            </h2>
            
            {/* Subtitle */}
            <p className="text-lg text-white/90 font-medium">
              Redefine Your Everyday Style
            </p>
            
            {/* Dots Indicator */}
            <div className="flex justify-center lg:justify-start gap-2 mt-6">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeSlide === index ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Product Showcase */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="flex gap-4 lg:gap-6 items-center">
              {clothingItems.map((item, index) => (
                <div
                  key={index}
                  className={`w-24 h-24 lg:w-32 lg:h-32 bg-white/95 rounded-xl shadow-xl flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:rotate-0 ${
                    index === 0 ? "-rotate-6" : index === 1 ? "rotate-6 scale-110 z-10" : "-rotate-3"
                  }`}
                >
                  <div className={`w-16 h-16 lg:w-20 lg:h-20 ${item.color} rounded-lg flex items-center justify-center`}>
                    <span className="text-xs lg:text-sm font-bold text-gray-700">
                      {item.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
            {categories.map((category, index) => (
              <button
                key={index}
                className="flex flex-col items-center group transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-2 border border-white/30 group-hover:bg-white/30 transition-all duration-300">
                  <span className="text-lg lg:text-xl">{category.icon}</span>
                </div>
                <span className="text-xs lg:text-sm font-semibold text-white/90 group-hover:text-white transition-colors duration-300">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;