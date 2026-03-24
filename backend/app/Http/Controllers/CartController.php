<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class CartController extends Controller
{
    private function getCart(Request $request): Cart
    {
        if (Auth::check()) {
            $cart = Cart::firstOrCreate(['user_id' => Auth::id()]);
        } else {
            $sessionId = $request->session()->get('cart_session_id');
            if (!$sessionId) {
                $sessionId = Str::uuid()->toString();
                $request->session()->put('cart_session_id', $sessionId);
            }
            $cart = Cart::firstOrCreate(['session_id' => $sessionId]);
        }
        return $cart;
    }

    private function getCartItems(Cart $cart)
    {
        return $cart->items()->with('product')->get()->map(function ($item) {
            return [
                'id' => $item->id,
                'product_id' => $item->product_id,
                'name' => $item->product->name ?? 'Unknown Product',
                'image' => $item->product->image ?? null,
                'quantity' => $item->quantity,
                'size' => $item->size,
                'color' => $item->color,
                'price' => (float) $item->price,
            ];
        });
    }

    public function index(Request $request)
    {
        $cart = $this->getCart($request);
        return response()->json(['items' => $this->getCartItems($cart)]);
    }

    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'integer|min:1',
            'size' => 'nullable|string',
            'color' => 'nullable|string',
        ]);

        $product = Product::findOrFail($request->product_id);
        $cart = $this->getCart($request);

        $existingItem = $cart->items()
            ->where('product_id', $request->product_id)
            ->where('size', $request->size)
            ->where('color', $request->color)
            ->first();

        if ($existingItem) {
            $existingItem->update(['quantity' => $existingItem->quantity + ($request->quantity ?? 1)]);
        } else {
            $cart->items()->create([
                'product_id' => $request->product_id,
                'quantity' => $request->quantity ?? 1,
                'size' => $request->size,
                'color' => $request->color,
                'price' => $product->price,
            ]);
        }

        return response()->json(['items' => $this->getCartItems($cart)]);
    }

    public function update(Request $request, $itemId)
    {
        $request->validate(['quantity' => 'required|integer|min:0']);

        $cart = $this->getCart($request);
        $item = $cart->items()->where('id', $itemId)->firstOrFail();

        if ($request->quantity <= 0) {
            $item->delete();
        } else {
            $item->update(['quantity' => $request->quantity]);
        }

        return response()->json(['items' => $this->getCartItems($cart)]);
    }

    public function remove(Request $request, $itemId)
    {
        $cart = $this->getCart($request);
        $cart->items()->where('id', $itemId)->delete();

        return response()->json(['items' => $this->getCartItems($cart)]);
    }

    public function clear(Request $request)
    {
        $cart = $this->getCart($request);
        $cart->items()->delete();

        return response()->json(['items' => []]);
    }
}
