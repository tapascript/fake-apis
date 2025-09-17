// middlewares.js - Custom middlewares for JSON Server
const cors = require('cors');

module.exports = (req, res, next) => {
  // Enable CORS for all routes
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true
  })(req, res, () => {});

  // Add delay for realistic API simulation (only in dev mode)
  if (process.env.NODE_ENV !== 'production') {
    const delay = Math.random() * 500 + 200; // 200-700ms delay
    setTimeout(() => next(), delay);
  } else {
    next();
  }

  // Custom route for user posts
  if (req.method === 'GET' && req.url.match(/^\/api\/users\/\d+\/posts$/)) {
    const userId = req.url.match(/\/api\/users\/(\d+)\/posts$/)[1];
    const db = require('./db.json');
    const userPosts = db.posts.filter(post => post.userId === userId);
    
    res.json(userPosts);
    return;
  }

  // Custom route for products with filtering and sorting
  if (req.method === 'GET' && req.url.startsWith('/api/products')) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const categoryId = url.searchParams.get('category');
    const sortBy = url.searchParams.get('sort') || 'name';
    const filterBy = url.searchParams.get('filter') || 'all';
    const search = url.searchParams.get('search');
    
    const db = require('./db.json');
    let products = [...db.products];

    // Filter by category
    if (categoryId && categoryId !== 'all') {
      products = products.filter(product => product.categoryId === categoryId);
    }

    // Filter by availability
    if (filterBy === 'in-stock') {
      products = products.filter(product => product.inStock);
    } else if (filterBy === 'on-sale') {
      products = products.filter(product => product.price < product.originalPrice);
    }

    // Search functionality
    if (search) {
      const searchLower = search.toLowerCase();
      products = products.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Sort products
    products.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    res.json(products);
    return;
  }

  // Transform user routes to include /api prefix
  if (req.url.startsWith('/api/users')) {
    req.url = req.url.replace('/api/users', '/users');
  }

  // Transform product routes to include /api prefix
  if (req.url.startsWith('/api/products')) {
    req.url = req.url.replace('/api/products', '/products');
  }

  // Transform category routes to include /api prefix  
  if (req.url.startsWith('/api/categories')) {
    req.url = req.url.replace('/api/categories', '/categories');
  }

  // Add realistic response headers
  res.setHeader('X-API-Version', '1.0');
  res.setHeader('X-Response-Time', Date.now().toString());

  // Log requests in development
  if (process.env.NODE_ENV !== 'production') {
    console.log(`${req.method} ${req.originalUrl || req.url} - ${new Date().toISOString()}`);
  }

  // Handle preflight OPTIONS requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }

  next();
};