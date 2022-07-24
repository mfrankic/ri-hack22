<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;
    protected $fillable = [
        'type',
        'lat',
        'lon',
        'grid_id',
        'accepted',
        'declined',
        'resolved',
        'user_id',
        'image_path',
        'location_name',
    ];
}
