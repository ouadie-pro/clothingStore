<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    private $cart = [];

    public function index(Request $request)
    {
        return response()->json(['items' => $this->cart]);
    }

    public function add(Request $request)
    {
        $productId = $request->input('product_id');
        $quantity = $request->input('quantity', 1);
        $size = $request->input('size');
        $color = $request->input('color');
        
        $existingIndex = array_search($productId, array_column($this->cart, 'product_id'));
        
        if ($existingIndex !== false) {
            $this->cart[$existingIndex]['quantity'] += $quantity;
        } else {
            $this->cart[] = [
                'id' => time(),
                'product_id' => $productId,
                'quantity' => $quantity,
                'size' => $size,
                'color' => $color,
                'price' => 0,
            ];
        }
        
        return response()->json(['items' => $this->cart]);
    }

    public function update(Request $request, $itemId)
    {
        $quantity = $request->input('quantity');
        
        foreach ($this->cart as &$item) {
            if ($item['id'] == $itemId) {
                $item['quantity'] = $quantity;
                break;
            }
        }
        
        return response()->json(['items' => $this->cart]);
    }

    public function remove(Request $request, $itemId)
    {
        $this->cart = array_filter($this->cart, function($item) use ($itemId) {
            return $item['id'] != $itemId;
        });
        
        return response()->json(['items' => array_values($this->cart)]);
    }

    public function clear(Request $request)
    {
        $this->cart = [];
        
        return response()->json(['items' => []]);
    }
}
