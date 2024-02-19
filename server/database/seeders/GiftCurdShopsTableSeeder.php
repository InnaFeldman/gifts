<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class GiftCurdShopsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        foreach (range(1, 7000) as $index) {
            DB::table('gift_curd_shops')->insert([
                'gift_card_id' => $faker->numberBetween(1, 10000),
                'shop_id' => $faker->numberBetween(1, 500),
                'used_amount' => $faker->randomFloat(2, 0, 50),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
