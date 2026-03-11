<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

      public function store(Request $request)
    {
        $request->validate([
            'First_Name' => 'required|string|max:255',
            'Last_Name' => 'required|string|max:255',
            'Address' => 'required|string|max:255',
            'City' => 'required|string|max:255',
            'PostalCode' => 'required|string|max:20',
        ]);

        $user = User::create([
            'First_Name' => $request->First_Name,
            'Last_Name' => $request->Last_Name,
            'Address' => $request->Address,
            'City' => $request->City,
            'PostalCode' => $request->PostalCode,
        ]);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ], 201);
    }

  
    public function show($id)
    {
        $user = User::find($id);

        if(!$user){
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user);
    }

  
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if(!$user){
            return response()->json(['message' => 'User not found'], 404);
        }

        $request->validate([
            'First_Name' => 'sometimes|string|max:255',
            'Last_Name' => 'sometimes|string|max:255',
            'Address' => 'sometimes|string|max:255',
            'City' => 'sometimes|string|max:255',
            'PostalCode' => 'sometimes|string|max:20',
        ]);

        $user->update([
            'First_Name' => $request->First_Name ?? $user->First_Name,
            'Last_Name' => $request->Last_Name ?? $user->Last_Name,
            'Address' => $request->Address ?? $user->Address,
            'City' => $request->City ?? $user->City,
            'PostalCode' => $request->PostalCode ?? $user->PostalCode,
        ]);

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user
        ]);
    }

    
    public function destroy($id)
    {
        $user = User::find($id);

        if(!$user){
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
}