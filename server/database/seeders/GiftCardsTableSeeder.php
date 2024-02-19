<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class GiftCardsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       $faker = Faker::create();

          foreach (range(1, 10000) as $index) {
            DB::table('gift_cards')->insert([
                'code' => $faker->unique()->uuid,
                'balance' => $faker->randomFloat(2, 10, 500),
                'used_balance' => 0,
                'expiry_date' => $faker->dateTimeBetween('+1 month', '+1 year')->format('Y-m-d'),
                'user_id' => $faker->numberBetween(1, 100),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
