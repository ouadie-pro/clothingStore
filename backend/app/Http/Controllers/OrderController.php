<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::where('user_id', Auth::id())
            ->with('items.product')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['data' => $orders]);
    }

    public function show(Request $request, $id)
    {
        $order = Order::where('id', $id)
            ->where('user_id', Auth::id())
            ->with('items.product')
            ->firstOrFail();

        return response()->json($order);
    }

    public function store(Request $request)
    {
        $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'address' => 'required|string|max:500',
            'city' => 'required|string|max:255',
            'postalCode' => 'required|string|max:20',
            'email' => 'required|email',
            'phone' => 'nullable|string',
            'shipping_method' => 'required|in:standard,express',
            'payment_method' => 'required|in:card,apple,paypal',
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.size' => 'nullable|string',
            'items.*.color' => 'nullable|string',
            'items.*.price' => 'required|numeric',
        ]);

        $shippingCost = $request->shipping_method === 'express' ? 15.00 : 0.00;
        $subtotal = collect($request->items)->sum(fn($item) => $item['price'] * $item['quantity']);
        $tax = $subtotal * 0.08;
        $total = $subtotal + $tax + $shippingCost;

        $order = DB::transaction(function () use ($request, $shippingCost, $subtotal, $tax, $total) {
            $order = Order::create([
                'user_id' => Auth::id(),
                'first_name' => $request->firstName,
                'last_name' => $request->lastName,
                'address' => $request->address,
                'city' => $request->city,
                'postal_code' => $request->postalCode,
                'email' => $request->email,
                'phone' => $request->phone,
                'shipping_method' => $request->shipping_method,
                'shipping_cost' => $shippingCost,
                'payment_method' => $request->payment_method,
                'subtotal' => $subtotal,
                'tax' => $tax,
                'total' => $total,
                'status' => 'pending',
            ]);

            foreach ($request->items as $item) {
                $order->items()->create([
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'size' => $item['size'],
                    'color' => $item['color'],
                    'price' => $item['price'],
                ]);
            }

            if (Auth::check()) {
                $cart = Cart::where('user_id', Auth::id())->first();
                if ($cart) {
                    $cart->items()->delete();
                }
            }

            return $order;
        });

        return response()->json($order->load('items.product'), 201);
    }
}
