<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notifs extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'desc',
        'image_path',
    ];
}
