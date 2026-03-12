<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'First_Name' => 'Test',
            'Last_Name' => 'User',
            'Address' => '123 Test Street',
            'City' => 'Test City',
            'PostalCode' => '12345',
        ]);

        $this->call([
            ProductSeeder::class,
        ]);
    }
}
