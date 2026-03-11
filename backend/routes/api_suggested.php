<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;

/*
|--------------------------------------------------------------------------
| API Routes for Modern Closet
|--------------------------------------------------------------------------
|
| The following routes are required for the React frontend to function.
| These routes should be added to the backend/routes/api.php file.
|
*/

// Public Routes
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/products/featured', [ProductController::class, 'featured']);
Route::get('/products/trending', [ProductController::class, 'trending']);

Route::get('/categories', [CategoryController::class, 'index']);

// Protected Routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    
    // Cart
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart/add', [CartController::class, 'add']);
    Route::put('/cart/{itemId}', [CartController::class, 'update']);
    Route::delete('/cart/{itemId}', [CartController::class, 'remove']);
    Route::delete('/cart/clear', [CartController::class, 'clear']);
    
    // Orders
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::post('/orders', [OrderController::class, 'store']);
});
