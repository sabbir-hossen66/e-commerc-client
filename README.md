🛍️ NijerBazar Client
A modern e-commerce platform built with Next.js, offering a seamless shopping experience with elegant design and powerful functionality.

🌟 Features

🎨 Modern UI/UX: Clean, responsive design with Tailwind CSS and shadcn/ui components
🔍 Advanced Search: Real-time product search with intelligent filtering
📱 Mobile-First: Fully responsive design optimized for all devices
⚡ Fast Performance: Built with Next.js 14+ for optimal loading speeds
🛒 Shopping Cart: Intuitive cart management and checkout process
⭐ Customer Reviews: Interactive review system with ratings
🏷️ Product Categories: Organized browsing by categories (T-shirts, Jackets, Dresses, etc.)
🎯 Smart Filtering: Filter by price, rating, category, and availability
📊 Real-time Updates: Live inventory and pricing updates
🔐 Type Safety: Full TypeScript implementation for robust development

🛠️ Tech Stack
Core Technologies

Next.js 14+ - React framework with App Router
TypeScript - Type-safe JavaScript
Tailwind CSS - Utility-first CSS framework
shadcn/ui - Re-usable component library

Development Tools

Node.js (Latest LTS version)
npm - Package manager
ESLint - Code linting
Prettier - Code formatting

UI Components & Styling

Responsive design with mobile-first approach
Custom yellow brand theme
Interactive animations and transitions
Accessible components following WCAG guidelines

🚀 Getting Started
Prerequisites
Make sure you have the following installed:

Node.js (Latest LTS version - v22.14.0)
npm (comes with Node.js)

Installation

Clone the repository
bashgit clone https://github.com/sabbir-hossen66/e-commerc-client.git
cd nijer-bazar-client

Install dependencies
bashnpm install

Set up environment variables
bashcp .env.example .env.local
Update the environment variables in .env.local:
envNEXT_PUBLIC_API_BASE_URL=your_api_endpoint_here
NEXT_PUBLIC_APP_URL=http://localhost:3000

Run the development server
bashnpm run dev

Open your browser
Navigate to http://localhost:3000 to see the application.


Color Palette

Primary: Yellow (#F59E0B, #FCD34D)
Secondary: Gray (#6B7280, #F3F4F6)
Accent: White (#FFFFFF)

Key Components

Navbar: Responsive navigation with mobile menu
Product Cards: Interactive product displays with ratings
Search Bar: Real-time search with filtering
Reviews Carousel: Customer testimonials with ratings
Fashion Banner: Hero section with promotional content

📦 Available Scripts
bash# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # Run TypeScript checks

# Styling
npm run build-css    # Build Tailwind CSS
🔧 Configuration
Tailwind CSS
Custom configuration with:

Yellow brand colors
Extended spacing and sizing
Custom component utilities
Responsive breakpoints

shadcn/ui
Configured with custom theme:
json{
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  }
}
🌐 API Integration
The application is structured for easy API integration:
Endpoints Expected
GET /api/products              # Get all products
GET /api/products/:id          # Get single product
GET /api/categories            # Get product categories
GET /api/reviews               # Get customer reviews
POST /api/cart                 # Add to cart
POST /api/orders               # Place order
Data Models

Product: Complete product information with pricing, ratings, and inventory
Category: Product categorization system
Review: Customer feedback and ratings
Cart: Shopping cart management

📱 Responsive Design

Mobile: 320px - 768px
Tablet: 768px - 1024px
Desktop: 1024px+
Large Screen: 1440px+

Optimized for touch interactions and various screen sizes.
🚀 Deployment
Build for Production
bashnpm run build
npm run start
Deploy to Vercel (Recommended)
bashnpm install -g vercel
vercel deploy
Environment Variables for Production
envNEXT_PUBLIC_API_BASE_URL=https://your-production-api.com/api
NEXT_PUBLIC_APP_URL=https://your-domain.com
🤝 Contributing

Fork the repository
Create a feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

📋 Development Guidelines
Code Style

Use TypeScript for all components
Follow ESLint and Prettier configurations
Use meaningful component and variable names
Write clean, self-documenting code

Component Structure

Use functional components with hooks
Implement proper error boundaries
Follow single responsibility principle
Make components reusable and composable

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
👨‍💻 Author
Your Name

GitHub: @yourusername
LinkedIn: Your LinkedIn

🙏 Acknowledgments

Next.js Team for the amazing framework
shadcn for the beautiful component library
Tailwind CSS for the utility-first CSS framework
Vercel for seamless deployment platform

