<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        if ($request->filled('category')) {
            $query->where('gender', $request->category);
        }

        if ($request->filled('q')) {
            $query->where('name', 'like', '%' . $request->q . '%');
        }

        if ($request->filled('sizes')) {
            $sizes = array_filter(explode(',', $request->sizes));
            if (!empty($sizes)) {
                $query->whereIn('size', $sizes);
            }
        }

        if ($request->filled('colors')) {
            $colors = array_filter(explode(',', $request->colors));
            if (!empty($colors)) {
                $query->whereIn('color', $colors);
            }
        }

        if ($request->filled('price_min') && is_numeric($request->price_min)) {
            $query->where('price', '>=', (float) $request->price_min);
        }

        if ($request->filled('price_max') && is_numeric($request->price_max)) {
            $query->where('price', '<=', (float) $request->price_max);
        }

        if ($request->filled('sort')) {
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
