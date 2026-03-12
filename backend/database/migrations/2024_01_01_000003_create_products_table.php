<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('original_price', 10, 2)->nullable();
            $table->string('category');
            $table->string('gender'); // 'men', 'women', 'unisex'
            $table->string('image'); // local path like /images/imgMen/Men0.jpg
            $table->json('images')->nullable(); // additional images
            $table->string('variant')->nullable(); // color, material, etc.
            $table->string('size')->nullable();
            $table->string('color')->nullable();
            $table->boolean('is_new')->default(false);
            $table->boolean('is_sale')->default(false);
            $table->integer('stock')->default(0);
            $table->integer('rating')->default(0);
            $table->integer('reviews')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
