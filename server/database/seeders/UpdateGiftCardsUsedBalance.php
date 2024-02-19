<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\GiftCard;
use App\Models\GiftCardShop;

class UpdateGiftCardsUsedBalance extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $giftCards = GiftCard::all();

        foreach($giftCards as $card){
            $giftCardShop = GiftCardShop::where('gift_card_id', $card->id)->groupBy('gift_card_id')->sum('used_amount');

            if($giftCardShop){
                $card->used_balance = $giftCardShop;

                if($giftCardShop > $card->balance){
                    $card->balance = $card->balance + $giftCardShop;
                }

                $card->save();
            }
        }

    }
}
