<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $menImages = [
            '/images/imgMen/Men0.jpg',
            '/images/imgMen/Men1.jpg',
            '/images/imgMen/Men2.jpg',
            '/images/imgMen/Men3.jpg',
            '/images/imgMen/Men4.jpg',
            '/images/imgMen/Men5.jpg',
            '/images/imgMen/Men6.jpg',
            '/images/imgMen/Men7.jpg',
            '/images/imgMen/Men8.jpg',
            '/images/imgMen/Men9.jpg',
            '/images/imgMen/Men10.jpg',
            '/images/imgMen/Men11.jpg',
            '/images/imgMen/Men12.jpg',
            '/images/imgMen/Men13.jpg',
            '/images/imgMen/Men14.jpg',
            '/images/imgMen/Men15.jpg',
            '/images/imgMen/Men16.jpg',
            '/images/imgMen/Men17.jpg',
            '/images/imgMen/Men18.jpg',
            '/images/imgMen/Men19.jpg',
            '/images/imgMen/Men20.jpg',
            '/images/imgMen/Men21.jpg',
            '/images/imgMen/Men22.jpg',
            '/images/imgMen/Men23.jpg',
        ];

        $womenImages = [
            '/images/imgWomen/Women1.webp',
            '/images/imgWomen/Women2.webp',
            '/images/imgWomen/Women3.webp',
            '/images/imgWomen/Women4.webp',
            '/images/imgWomen/Women5.webp',
            '/images/imgWomen/Women6.webp',
            '/images/imgWomen/Women7.webp',
            '/images/imgWomen/Women8.webp',
            '/images/imgWomen/Women9.webp',
            '/images/imgWomen/Women10.webp',
            '/images/imgWomen/Women11.webp',
            '/images/imgWomen/Women12.webp',
            '/images/imgWomen/Women13.webp',
            '/images/imgWomen/Women14.webp',
            '/images/imgWomen/Women15.webp',
            '/images/imgWomen/Women16.webp',
            '/images/imgWomen/Women17.webp',
            '/images/imgWomen/Women18.webp',
            '/images/imgWomen/Women19.webp',
            '/images/imgWomen/Women20.webp',
            '/images/imgWomen/Women21.webp',
            '/images/imgWomen/Women22.webp',
            '/images/imgWomen/Women23.webp',
            '/images/imgWomen/Women24.webp',
        ];

        $menProducts = [
            ['name' => 'Classic Wool Blazer', 'category' => 'Outerwear', 'price' => 245, 'description' => 'Timeless wool blazer for the modern professional'],
            ['name' => 'Slim Fit Chinos', 'category' => 'Bottoms', 'price' => 89, 'description' => 'Comfortable cotton chinos with a modern cut'],
            ['name' => 'Oxford Button-Down', 'category' => 'Shirts', 'price' => 75, 'description' => 'Classic oxford shirt in premium cotton'],
            ['name' => 'Merino Wool Sweater', 'category' => 'Knitwear', 'price' => 120, 'description' => 'Soft merino wool sweater for layering'],
            ['name' => 'Leather Belt', 'category' => 'Accessories', 'price' => 55, 'description' => 'Genuine leather belt with silver buckle'],
            ['name' => 'Cotton Crew Neck Tee', 'category' => 'T-Shirts', 'price' => 35, 'description' => 'Essential cotton t-shirt in classic fit'],
            ['name' => 'Wool Overcoat', 'category' => 'Outerwear', 'price' => 350, 'description' => 'Premium wool overcoat for cold weather'],
            ['name' => 'Denim Jacket', 'category' => 'Outerwear', 'price' => 150, 'description' => 'Classic denim jacket with modern styling'],
            ['name' => 'Linen Trousers', 'category' => 'Bottoms', 'price' => 95, 'description' => 'Lightweight linen trousers for summer'],
            ['name' => 'Cashmere Scarf', 'category' => 'Accessories', 'price' => 85, 'description' => 'Luxurious cashmere scarf'],
            ['name' => 'Leather Chelsea Boots', 'category' => 'Footwear', 'price' => 220, 'description' => 'Classic leather Chelsea boots'],
            ['name' => 'Suede Loafers', 'category' => 'Footwear', 'price' => 165, 'description' => 'Comfortable suede loafers'],
        ];

        $womenProducts = [
            ['name' => 'Silk Blouse', 'category' => 'Tops', 'price' => 145, 'description' => 'Elegant silk blouse for any occasion'],
            ['name' => 'High-Waist Jeans', 'category' => 'Bottoms', 'price' => 120, 'description' => 'Flattering high-waist jeans'],
            ['name' => 'Cashmere Cardigan', 'category' => 'Knitwear', 'price' => 195, 'description' => 'Soft cashmere cardigan'],
            ['name' => 'Leather Handbag', 'category' => 'Accessories', 'price' => 280, 'description' => 'Genuine leather handbag'],
            ['name' => 'Wrap Dress', 'category' => 'Dresses', 'price' => 165, 'description' => 'Classic wrap dress'],
            ['name' => 'Tailored Blazer', 'category' => 'Outerwear', 'price' => 225, 'description' => 'Modern tailored blazer'],
            ['name' => 'Linen Blouse', 'category' => 'Tops', 'price' => 89, 'description' => 'Breathable linen blouse'],
            ['name' => 'Midi Skirt', 'category' => 'Bottoms', 'price' => 95, 'description' => 'Elegant midi skirt'],
            ['name' => 'Wool Coat', 'category' => 'Outerwear', 'price' => 320, 'description' => 'Warm wool coat'],
            ['name' => 'Silk Scarf', 'category' => 'Accessories', 'price' => 75, 'description' => 'Luxurious silk scarf'],
            ['name' => 'Ankle Boots', 'category' => 'Footwear', 'price' => 180, 'description' => 'Stylish ankle boots'],
            ['name' => 'Leather Tote', 'category' => 'Accessories', 'price' => 245, 'description' => 'Spacious leather tote bag'],
        ];

        foreach ($menProducts as $index => $product) {
            $imageIndex = $index % count($menImages);
            Product::create([
                'name' => $product['name'],
                'description' => $product['description'],
                'price' => $product['price'],
                'original_price' => null,
                'category' => $product['category'],
                'gender' => 'men',
                'image' => $menImages[$imageIndex],
                'images' => json_encode([$menImages[$imageIndex]]),
                'is_new' => $index < 4,
                'is_sale' => false,
                'stock' => rand(10, 100),
                'rating' => rand(35, 50) / 10,
                'reviews' => rand(10, 200),
            ]);
        }

        foreach ($womenProducts as $index => $product) {
            $imageIndex = $index % count($womenImages);
            Product::create([
                'name' => $product['name'],
                'description' => $product['description'],
                'price' => $product['price'],
                'original_price' => null,
                'category' => $product['category'],
                'gender' => 'women',
                'image' => $womenImages[$imageIndex],
                'images' => json_encode([$womenImages[$imageIndex]]),
                'is_new' => $index < 4,
                'is_sale' => false,
                'stock' => rand(10, 100),
                'rating' => rand(35, 50) / 10,
                'reviews' => rand(10, 200),
            ]);
        }
    }
}
