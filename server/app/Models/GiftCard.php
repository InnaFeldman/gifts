<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GiftCard extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        "code",
        "balance",
        "used_balance",
        "expiry_date",
        "user_id"
    ];


    public function user()
    {
        return $this->belongsTo(App\User::class);
    }
}
