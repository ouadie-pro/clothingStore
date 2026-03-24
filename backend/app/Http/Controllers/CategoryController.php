<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = [
            ['id' => 1, 'name' => 'Men', 'slug' => 'men'],
            ['id' => 2, 'name' => 'Women', 'slug' => 'women'],
            ['id' => 3, 'name' => 'Accessories', 'slug' => 'accessories'],
        ];

        return response()->json(['data' => $categories]);
    }
}
