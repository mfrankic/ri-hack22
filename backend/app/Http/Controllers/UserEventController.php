<?php

namespace App\Http\Controllers;

use App\Models\UserEvent;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Cleansing;

class UserEventController extends Controller
{
    public function create(Request $request) {

        $creator = User::where('auth_token', 'like', $request->creator_token)->first();
        $user = User::where('auth_token', 'like', $request->user_token)->first();

        $event = Cleansing::where('creator_id', 'like', $creator->id)->orderBy('event_time', 'DESC')->first();

        UserEvent::create([
            'user_id' => $user->id,
            'event_id' => $event->id,
        ]);
    }
}
