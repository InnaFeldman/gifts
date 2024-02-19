<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('gift_curd_shops', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('gift_card_id');
            $table->unsignedBigInteger('shop_id');
            $table->decimal('used_amount', 10, 2)->default(0);
            $table->timestamps();

            $table->foreign('gift_card_id')->references('id')->on('gift_cards')->onDelete('cascade');
            $table->foreign('shop_id')->references('id')->on('shops')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gift_curd_shops');
    }
};
