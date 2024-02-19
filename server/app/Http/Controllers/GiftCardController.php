<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\GiftCardService;
use App\Models\GiftCard;
use Illuminate\Support\Str;

class GiftCardController extends Controller
{
    public function getAllGiftCards(Request $request, GiftCardService $giftCardService){
        $data = $giftCardService->getAllGiftCards();
        return response()->json($data);
    }

    public function removeGiftCard($id){
        $giftCard = GiftCard::findOrFail($id);
        $giftCard->delete();
        return response()->json("Gift Card with id". $id. 'has been successfully removed.');
    }


    public function createGiftCard(Request $request){
        $data= $request->all();
        $data['code'] = Str::uuid()->toString();
        dd($data);
        $card = GiftCard::create($data);
        return response()->json($data);
    }

    public function editGiftCard($id, Request $request, GiftCardService $giftCardService){
        dd($id);
    }


    public function getFilteredShopsDataForUsers(Request $request, GiftCardService $giftCardService){
        $request = $request->all();
        $data = $giftCardService->getFilteredShopsDataForUsers($request);

        return response()->json($data);
    }
}
