<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'original_price',
        'category',
        'gender',
        'image',
        'images',
        'variant',
        'size',
        'color',
        'is_new',
        'is_sale',
        'stock',
        'rating',
        'reviews',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'original_price' => 'decimal:2',
        'images' => 'array',
        'is_new' => 'boolean',
        'is_sale' => 'boolean',
        'stock' => 'integer',
        'rating' => 'float',
        'reviews' => 'integer',
    ];
}
