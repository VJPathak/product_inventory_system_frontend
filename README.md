# Product Inventory System

A full-stack Product Inventory Management System built with the MERN stack (MongoDB, Express.js, React.js, Node.js) with Vite as the frontend build tool.

## 📋 Project Overview

This application allows users to manage product inventory with features including:

- ✨ Add new products with unique names
- 📝 Product details (Name, Description, Quantity, Categories)
- 🏷️ Multi-category support for products
- 📄 Paginated product listing
- 🔍 Search products by name
- 🎯 Filter products by multiple categories
- 🗑️ Delete products
- 🚀 Optimized for performance and scalability

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool and development server
- **CSS/Styled Components** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use MongoDB Atlas
- **Git** - [Download](https://git-scm.com/)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd product-inventory-system
```

### 2. Backend Setup

The backend API has been created separately and needs to be downloaded from GitHub.

#### Download Backend Repository

```bash
# Clone the backend repository
git clone <backend-repository-url>
cd backend
```

#### Install Backend Dependencies

```bash
npm install
```

#### Configure Backend Environment

Create a `.env` file in the backend root directory:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://vjpmongodb:vjpmongodb@cluster0.pakwt.mongodb.net/product_inventory?retryWrites=true&w=majority
```

#### Run Backend Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

The backend API will be running at: `http://localhost:5000/api`

### 3. Frontend Setup

Navigate back to the frontend directory (this project):

```bash
cd ../frontend
# or if you're in the main project directory
cd .
```

#### Install Frontend Dependencies

```bash
npm install
```

#### Configure Frontend Environment

The API is already integrated in this Vite project and configured to connect to:

**API Base URL:** `http://localhost:5000/api`

If you need to change the API URL, update it in the configuration file (usually in `src/config.js` or `.env`):

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

#### Run Frontend Development Server

```bash
npm run dev
```

## 🎯 Usage

### Adding a New Product

1. Navigate to the "Add Product" section
2. Fill in the required fields:
   - **Name** (must be unique)
   - **Description**
   - **Quantity**
   - **Categories** (select multiple)
3. Click "Submit" to add the product

### Viewing Products

- Products are displayed in a paginated list
- Each product shows:
  - Product name
  - Categories (as tags/bubbles)
  - Date added
  - Delete option

### Searching & Filtering

- **Search by Name:** Use the search bar to find products by name
- **Filter by Categories:** Select multiple categories from the dropdown
  - Products matching any selected category will be displayed

### Pagination

- Navigate through pages using numbered pagination (1, 2, 3, ...)
- Adjustable items per page

## 📂 Project Structure

```
product-inventory-system/
├── src/
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── services/         # API service calls
│   ├── utils/            # Utility functions
│   ├── hooks/            # Custom React hooks
│   ├── config/           # Configuration files
│   ├── App.tsx           # Main App component
│   └── main.tsx          # Entry point
├── public/               # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md            # Project documentation
```

## 🔧 Available Scripts

### Frontend Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Backend Scripts

```bash
# Start development server with nodemon
npm run dev

# Start production server
npm start

# Run seeder (to populate categories)
npm run seed
```

## ✅ Features Implemented

- [x] Product CRUD operations
- [x] Unique product name validation
- [x] Multi-category support
- [x] Paginated product listing
- [x] Search functionality
- [x] Multi-select category filter
- [x] Client-side validation
- [x] Server-side validation
- [x] Error handling and user feedback
- [x] Responsive UI design
- [x] Performance optimization

## 🔒 Validation Rules

- Product names must be unique
- All required fields must be filled
- Quantity must be a positive number
- At least one category must be selected
- Duplicate names are prevented at both client and server level

## 🐛 Error Handling

The application includes comprehensive error handling:

- Form validation errors
- Network request errors
- Duplicate entry errors
- Server errors with user-friendly messages

## 🌐 API Endpoints

The backend API provides the following endpoints:

```
GET    /api/products          # Get all products (with pagination, search, filters)
POST   /api/products          # Create a new product
DELETE /api/products/:id      # Delete a product
GET    /api/categories        # Get all categories
```

## 📝 Notes

- Categories are pre-populated in the database using a seeder script
- The backend repository must be running for the frontend to function
- MongoDB must be running locally or provide a MongoDB Atlas connection string
- Default port for backend: `5000`

## 🤝 Contributing

This project was created as part of a practical assessment for Techerudite.

## 📧 Contact

For any queries or issues, please reach out:

- **Developer:** Vashishth (pathakvashishth05@gmail.com)
- **Assessment Date:** 18th January 2026

## 📄 License

This project is created for educational and assessment purposes.

---

**Note:** Make sure both backend and frontend servers are running simultaneously for the application to work properly.