<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cleansing extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'lat',
        'lon',
        'desc',
        'grid_id',
        'creator_id',
        'image_path',
        'event_time',
        'published',
        'declined',
        'location_name',
    ];
}
