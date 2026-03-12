<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        if ($request->has('category')) {
            $query->where('gender', $request->category);
        }

        if ($request->has('q')) {
            $query->where('name', 'like', '%' . $request->q . '%');
        }

        if ($request->has('sizes')) {
            $sizes = explode(',', $request->sizes);
            $query->whereIn('size', $sizes);
        }

        if ($request->has('colors')) {
            $colors = explode(',', $request->colors);
            $query->whereIn('color', $colors);
        }

        if ($request->has('price_min')) {
            $query->where('price', '>=', $request->price_min);
        }

        if ($request->has('price_max')) {
            $query->where('price', '<=', $request->price_max);
        }

        if ($request->has('sort')) {
            switch ($request->sort) {
                case 'price_low':
                    $query->orderBy('price', 'asc');
                    break;
                case 'price_high':
                    $query->orderBy('price', 'desc');
                    break;
                case 'popular':
                    $query->orderBy('reviews', 'desc');
                    break;
                default:
                    $query->orderBy('created_at', 'desc');
            }
        }

        $products = $query->paginate(12);

        return response()->json($products);
    }

    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product);
    }

    public function featured()
    {
        $products = Product::where('is_new', true)->limit(6)->get();
        return response()->json($products);
    }

    public function trending()
    {
        $products = Product::orderBy('reviews', 'desc')->limit(10)->get();
        return response()->json($products);
    }
}
