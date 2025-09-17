# Fake APIs - API Server

A bunch of Fake APIs for creating Real applications.

## Quick Start

### Installation

```bash
npm install
```

### Start the Server

```bash
# Production mode (fast responses)
npm start

# Development mode (with realistic delays)
npm run dev
```

The server will run on `http://localhost:3001`

## API Endpoints

### User Management

#### Get User by ID

```bash
GET /api/users/{userId}
```

**Example**: `GET /api/users/1`

**Response**:

```json
{
  "id": "1",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "bio": "Full-stack developer passionate about React...",
  "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e...",
  "joinedAt": "2022-01-15T08:30:00Z",
  "location": "San Francisco, CA",
  "followers": 1250,
  "following": 380
}
```

#### Update User

```bash
PUT /api/users/{userId}
```

**Example**: `PUT /api/users/1`

**Request Body**:

```json
{
  "name": "John Smith",
  "email": "john.smith@example.com",
  "bio": "Updated bio text"
}
```

### User Posts

#### Get User's Posts

```bash
GET /api/users/{userId}/posts
```

**Example**: `GET /api/users/1/posts`

**Response**:

```json
[
  {
    "id": "1",
    "userId": "1",
    "title": "Understanding React Hooks: A Deep Dive",
    "content": "React Hooks have revolutionized...",
    "createdAt": "2024-01-15T10:30:00Z",
    "likes": 45,
    "comments": 12,
    "tags": ["react", "hooks", "javascript"]
  }
]
```

### Products (For Challenge)

#### Get All Products

```bash
GET /api/products
```

#### Get Products with Filtering and Sorting

```bash
GET /api/products?category={categoryId}&sort={sortBy}&filter={filterBy}&search={searchTerm}
```

**Query Parameters**:

- `category`: Filter by category ID (`1`, `2`, `3`, `4`)
- `sort`: Sort order (`name`, `price-low`, `price-high`, `rating`, `newest`)
- `filter`: Filter type (`all`, `in-stock`, `on-sale`)
- `search`: Search in name, description, and tags

**Examples**:

- `GET /api/products?category=1&sort=price-low` - Electronics sorted by price (low to high)
- `GET /api/products?filter=in-stock&search=react` - In-stock products containing "react"

### Categories

#### Get All Categories

```bash
GET /api/categories
```

## Sample Data

### Users Available

- **User 1**: John Doe (Full-stack developer)
- **User 2**: Sarah Wilson (UX Designer)  
- **User 3**: Mike Chen (Backend Engineer)

### Products Available

- **Electronics**: Headphones, Smart Watch, Monitor, Speaker
- **Clothing**: T-Shirts, Jeans
- **Books**: JavaScript Guide, React Patterns Book
- **Home & Garden**: Security Camera, Office Chair

## Testing with Your React App

### Basic User Profile Example

```javascript
// Test getting user data
const response = await axios.get('http://localhost:3001/api/users/1');
console.log(response.data);

// Test updating user
const updated = await axios.put('http://localhost:3001/api/users/1', {
  name: 'Updated Name',
  bio: 'New bio text'
});
```

### Products Challenge Example

```javascript
// Get electronics products sorted by price
const products = await axios.get('http://localhost:3001/api/products?category=1&sort=price-low');

// Search for React-related products
const reactProducts = await axios.get('http://localhost:3001/api/products?search=react');
```

## Features

### Realistic API Behavior

- **CORS enabled** for localhost:3000
- **Random delays** (200-700ms) in development mode
- **Request logging** for debugging
- **Error simulation** (uncommon, but realistic)

### Advanced Filtering

- Filter products by category, stock status, or sale status
- Sort by name, price, rating, or date
- Full-text search across name, description, and tags

### Data Persistence

- Changes persist during server session
- Use `npm run reset` to restore original data

## Troubleshooting

### Port Already in Use

If port 3001 is busy, modify the port in `package.json`:

```json
"start": "json-server --watch db.json --port 3002 --middlewares ./middlewares.js"
```

### CORS Issues

Make sure your React app is running on `http://localhost:3000`. If using a different port, update the CORS settings in `middlewares.js`.

### Server Not Responding

1. Check that the server is running: `npm start`
2. Verify the correct URL: `http://localhost:3001`
3. Check console for error messages

## Development Commands

```bash
# Start server with delays for realistic testing
npm run dev

# Start server without delays (production mode)  
npm start

# Reset database to original state
npm run reset

# Install dependencies
npm install
```

## Project Structure

```bash
container-presenter-api-server/
├── package.json          # Dependencies and scripts
├── db.json              # Main database file
├── middlewares.js       # Custom middleware for routing and CORS
├── README.md           # This file
└── .gitignore          # Git ignore patterns
```

## Sample API Responses

### User Profile Response

```json
{
  "id": "1",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "bio": "Full-stack developer passionate about React and Node.js...",
  "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e...",
  "joinedAt": "2022-01-15T08:30:00Z",
  "location": "San Francisco, CA",
  "website": "https://johndoe.dev",
  "followers": 1250,
  "following": 380
}
```

### Posts Response

```json
[
  {
    "id": "1",
    "userId": "1",
    "title": "Understanding React Hooks: A Deep Dive",
    "content": "React Hooks have revolutionized the way we write React components...",
    "excerpt": "A comprehensive guide to React Hooks, from basics to advanced patterns.",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z",
    "likes": 45,
    "comments": 12,
    "tags": ["react", "hooks", "javascript", "frontend"],
    "published": true,
    "readTime": "8 min read"
  }
]
```

### Products Response

```json
[
  {
    "id": "1",
    "name": "Wireless Bluetooth Headphones",
    "description": "Premium quality wireless headphones with noise cancellation...",
    "price": 199.99,
    "originalPrice": 249.99,
    "categoryId": "1",
    "category": "Electronics",
    "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e...",
    "rating": 4.5,
    "reviewCount": 128,
    "inStock": true,
    "stock": 45,
    "brand": "AudioTech",
    "tags": ["wireless", "bluetooth", "noise-cancelling"],
    "features": ["30-hour battery", "Active noise cancellation", "Quick charge", "Wireless connectivity"]
  }
]
```

Happy coding! 🚀
