<?php

namespace App\Services;
use Illuminate\Support\Facades\DB;
use App\Models\GiftCard;

class GiftCardService
{
    public function getFilteredShopsDataForUsers(array $params){
        $userNames = $params['userNames'];

        $query = DB::table('users')->whereIn('users.name', $userNames)
        ->leftJoin('gift_cards', 'gift_cards.user_id', '=', 'users.id')
        ->leftJoin('gift_card_shops', 'gift_card_shops.gift_card_id', '=', 'gift_cards.id')
        ->leftJoin('shops', 'shops.id', '=', 'gift_card_shops.shop_id')
        ->get();

        dd($query);
    }

    public function getAllGiftCards(){
        $data = GiftCard::join('users', 'users.id', '=', 'gift_cards.user_id')
        ->select(
            'gift_cards.*',
            'users.name as user_name',
            'users.email as user_email',
        )
        ->orderBy('id')
        ->take(50)
        ->get();

        return $data;
    }

}
