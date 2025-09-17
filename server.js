// server.js - Custom JSON Server setup
const jsonServer = require('json-server');
const middlewares = require('./middlewares');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const defaultMiddlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(defaultMiddlewares);

// Custom middlewares
server.use(middlewares);

// Custom routes before JSON Server router
server.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    endpoints: {
      users: '/api/users/:id',
      userPosts: '/api/users/:id/posts',
      products: '/api/products',
      categories: '/api/categories'
    }
  });
});

// Add custom routes for better API structure
server.get('/api/users/:id/posts', (req, res) => {
  const userId = req.params.id;
  const db = router.db; // Get the database
  const posts = db.get('posts').filter({ userId }).value();
  res.json(posts);
});

// Use default router
server.use('/api', router);
server.use(router);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log('🚀 Container-Presenter Pattern API Server');
  console.log(`📡 Server is running on http://localhost:${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log('');
  console.log('📋 Available Endpoints:');
  console.log(`   GET  /api/users/:id              - Get user profile`);
  console.log(`   PUT  /api/users/:id              - Update user profile`);
  console.log(`   GET  /api/users/:id/posts        - Get user posts`);
  console.log(`   GET  /api/products               - Get products (with filtering)`);
  console.log(`   GET  /api/categories             - Get product categories`);
  console.log('');
  console.log('🎯 Example URLs:');
  console.log(`   http://localhost:${PORT}/api/users/1`);
  console.log(`   http://localhost:${PORT}/api/users/1/posts`);
  console.log(`   http://localhost:${PORT}/api/products?category=1&sort=price-low`);
  console.log('');
  console.log('💡 Use "npm run dev" for slower responses (realistic API simulation)');
  console.log('');
});