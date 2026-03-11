# Backend API Endpoints Needed

The React frontend is configured to call these API endpoints. You need to add them to your Laravel backend.

## Required Controllers

1. **AuthController** - Handle authentication (register, login, logout, me)
2. **ProductController** - Handle products CRUD
3. **CategoryController** - Handle categories
4. **CartController** - Handle shopping cart
5. **OrderController** - Handle orders

## Required Models

1. **Product** - id, name, description, price, original_price, category_id, images (JSON), colors (JSON), sizes (JSON), is_new, is_sale, rating, reviews_count
2. **Category** - id, name, slug, image
3. **CartItem** - id, user_id, product_id, quantity, size, color
4. **Order** - id, user_id, status, total, shipping_address, payment_method, items (JSON)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - List products (with filters: category, sizes, colors, price_min, price_max, sort, q, page)
- `GET /api/products/{id}` - Get product details
- `GET /api/products/featured` - Get featured products
- `GET /api/products/trending` - Get trending products

### Categories
- `GET /api/categories` - List all categories

### Cart (Authenticated)
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart (product_id, quantity, size, color)
- `PUT /api/cart/{itemId}` - Update cart item quantity
- `DELETE /api/cart/{itemId}` - Remove item from cart
- `DELETE /api/cart/clear` - Clear cart

### Orders (Authenticated)
- `GET /api/orders` - List user orders
- `GET /api/orders/{id}` - Get order details
- `POST /api/orders` - Create new order

## Setup Steps

1. Install Laravel Sanctum for API authentication:
   ```bash
   composer require laravel/sanctum
   php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
   ```

2. Add `HasApiTokens` trait to User model:
   ```php
   use Laravel\Sanctum\HasApiTokens;
   
   class User extends Model {
       use HasApiTokens, HasFactory, Notifiable;
   }
   ```

3. Configure the API routes in routes/api.php

4. Run migrations for new tables (Product, Category, CartItem, Order)
