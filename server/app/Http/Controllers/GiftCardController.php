<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\GiftCardService;
use App\Models\GiftCard;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class GiftCardController extends Controller
{
    public function getAllGiftCards(Request $request, GiftCardService $giftCardService){
        $data = $giftCardService->getAllGiftCards($request);
        return response()->json($data);
    }

    public function removeGiftCard($id){
        $giftCard = GiftCard::findOrFail($id);
        $giftCard->delete();
        return response()->json("Gift Card with id". $id. 'has been successfully removed.');
    }


    public function createGiftCard(Request $request){
        $data= $request->all();
        $userId;
        $data['code'] = Str::uuid()->toString();
        $findUser = User::where('email',  $data['email'])->first();
        if(!$findUser){
           $newUser = User::create([
                "name" => $data['name'],
                "email"=> $data['email'],
                "password" => Hash::make(Str::random(12)),
            ]);
            $userId = $newUser->id;
        }else{
            $userId = $findUser->id;
        }

        $card = GiftCard::create([
            "code" => $data['code'],
            "balance" => $data['balance'],
            "used_balance" => 0,
            "expiry_date" => $data['expiry_date'],
            "user_id" => $userId
        ]);

        return response()->json($card);
    }

    public function editGiftCard($id, Request $request, GiftCardService $giftCardService){
        $data = $request->all();
        $giftCard = GiftCard::findOrFail($id);
        $giftCard->balance = $data['balance'];
        $giftCard->expiry_date = $data['expiry_date'];
        $giftCard->save();

        return response()->json($giftCard);
    }


    public function getFilteredShopsDataForUsers(Request $request, GiftCardService $giftCardService){
        $request = $request->all();
        $data = $giftCardService->getFilteredShopsDataForUsers($request);

        return response()->json($data);
    }
}
