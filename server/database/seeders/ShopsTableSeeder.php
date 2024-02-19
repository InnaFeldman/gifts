<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ShopsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        foreach (range(1, 500) as $index) {
            DB::table('shops')->insert([
                'name' => $faker->company,
                'total_sales' => $faker->randomFloat(2, 1000, 5000),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
