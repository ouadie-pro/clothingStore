<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;

Route::apiResource('users', UserController::class);

Route::get('/products/featured', [ProductController::class, 'featured']);
Route::get('/products/trending', [ProductController::class, 'trending']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/products', [ProductController::class, 'index']);

Route::get('/cart', [CartController::class, 'index']);
Route::post('/cart/add', [CartController::class, 'add']);
Route::put('/cart/{itemId}', [CartController::class, 'update']);
Route::delete('/cart/{itemId}', [CartController::class, 'remove']);
Route::delete('/cart/clear', [CartController::class, 'clear']);
