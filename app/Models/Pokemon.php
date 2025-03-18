<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pokemon extends Model
{
    protected $fillable = [
        'name',
        'sprite_url',
        'hp',
        'attack',
        'defense',
        'special_attack',
        'special_defense',
        'speed',
        'rating'
    ];
} 