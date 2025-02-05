# HouseMate Server

A Node.js backend service managing household inventory, recipes, and shopping data with TypeScript, Express, and MongoDB.

## Features

- 🔐 **Authentication**
  - JWT-based user authentication
  - Role-based access control (User/Admin)
  - Token blacklist for secure logout
  - Password hashing with bcrypt

- 📦 **Inventory Management**
  - Track items with quantities and storage locations
  - Barcode support with expiry dates
  - Store price history
  - Multiple storage locations (Fridge/Pantry/Freezer)

- 🛒 **Store Management**
  - Store details and locations
  - Contact information
  - Website tracking

- 🍳 **Recipe Management**
  - Create and track recipes
  - Ingredient quantities and units
  - Step-by-step instructions
  - Difficulty levels and timing
  - Recipe categorization

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **API Documentation**: Swagger/OpenAPI
- **Testing**: Jest & Supertest

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB instance
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/housemate-server.git
cd housemate-server
```

2. Install dependencies:
```bash
npm install
```

3. Create environment files:
```bash
cp .env.example .env
```

4. Configure environment variables in .env:
```bash
ATLAS_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

### Running the Application

#### Development mode:
```bash
npm run dev
```

#### Production build:
```bash
npm run build
npm start
```

#### Run tests:
```bash
npm test
```

## Project Structure

```plaintext
src/
├── config/         # Configuration files
├── middleware/     # Express middlewares
├── models/         # Database schemas and interfaces
├── routes/         # API routes
└── services/       # Business logic

tests/
├── helpers/        # Test utilities
└── *.test.ts      # Test suites
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/profile` - Get user profile
- `PUT /auth/profile` - Update user profile
- `DELETE /auth/profile` - Delete user account

### Items
- `GET /items` - List all items
- `GET /items/:id` - Get specific item
- `POST /items` - Create new item
- `PUT /items/:id` - Update item
- `DELETE /items/:id` - Delete item

### Stores
- `GET /stores/all` - List all stores
- `GET /stores/:id` - Get specific store
- `POST /stores/new` - Create new store
- `PUT /stores/:id` - Update store
- `DELETE /stores/:id` - Delete store

### Receipts
- `GET /receipts` - List all Receipts
- `GET /receipts/:id` - Get specific receipt
- `GET /receipts/:StoreId` - Get all receipts for a store
- `GET /receipts/:date` - Get all receipts for specified date
- `POST /receipts` - Create new receipt
- `PUT /receipts/:id` - Update receipt
- `DELETE /receipts/:id` - Delete receipt

### Recipes
- `GET /recipes` - List all recipes
- `GET /recipes/:id` - Get specific recipe
- `POST /recipes` - Create new recipe
- `PUT /recipes/:id` - Update recipe
- `DELETE /recipes/:id` - Delete recipe

## Environment Variables
- `ATLAS_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: Environment (development/production)

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Author
Pedro M Lourenço