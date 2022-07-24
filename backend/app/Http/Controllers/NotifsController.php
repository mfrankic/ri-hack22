<?php

namespace App\Http\Controllers;

use App\Models\Notifs;
use App\Models\Grid;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class NotifsController extends Controller
{
    public function index() {
        $notifs = Notifs::orderBy('id', 'desc')->take(10)->get();

        return response()->json(['notifs' => $notifs]);
    }


    public function create(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'auth_token' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([], 401);
        }
        if ($request->hasFile('image')) {

            $request->validate([
                'image' => 'mimes:jpeg,bmp,png'
            ]);

            $user = User::where('auth_token', 'like', $request->auth_token)->where('role', 'like', 'admin')->first();

            if ($user === null) return response()->json([], 401);

            $image_path = 'http://192.168.43.193:8000/' . str_replace('public', 'storage', $request->image->store('public'));

            $notif = Notifs::create([
                "image_path" => $image_path,
                'title' => $request->title,
                'desc' => $request->desc,
            ]);
        }

        return response()->json(['notif' => $notif], 201);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'id' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([], 401);
        }

        $user = User::where('auth_token', 'like', $request->auth_token)->where('role', 'like', 'admin')->first();

        if ($user === null) return response()->json([], 401);

        $notif = Notifs::find($request->id);

        return $request->hasFile('image');

        if ($request->hasFile('image')) {

            $request->validate([
                'image' => 'mimes:jpeg,bmp,png,jpg'
            ]);

            $notif->image_path = 'http://192.168.43.193:8000/' . str_replace('public', 'storage', $request->image->store('public'));
        }

        if ($request->title) {
            $notif->title = $request->title;
        }
        if ($request->desc) {
            $notif->desc = $request->desc;
        }

        $notif->save();

        return response()->json(['notifs' => $notifs], 201);
    }
}
