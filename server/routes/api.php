<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GiftCardController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('contracts/data-for-filters', [GiftCardController::class, 'getFilteredShopsDataForUsers']);
Route::get('gift-cards', [GiftCardController::class, 'getAllGiftCards']);
Route::delete('gift-cards/{id}', [GiftCardController::class, 'removeGiftCard']);
Route::post('gift-cards/add', [GiftCardController::class, 'createGiftCard']);
Route::put('gift-cards/{id}', [GiftCardController::class, 'editGiftCard']);
