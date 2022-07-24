<?php

namespace App\Http\Controllers;

use App\Models\Cleansing;
use App\Models\Grid;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CleansingController extends Controller
{
    public function index() {
        $cleansing = Cleansing::where('published', true)->where('declined', false)->whereDate('event_time', '>=', now())->get();

        return response()->json(['cleansing' => $cleansing]);
    }

    public function cleansings() {
        $cleansing = Cleansing::where('published', false)->where('declined', false)->whereDate('event_time', '>=', now())->get();

        return response()->json(['cleansing' => $cleansing]);
    }

    public function history(Request $request) {

        $user = User::where('auth_token', 'like', $request->auth_token)->first();

        if ($user === null) return response()->json([], 401);

        $cleansing = DB::table('cleansings')
            ->join('user_events', 'user_events.event_id', '=', 'cleansings.id')
            ->join('users', 'users.id', '=', 'user_events.user_id')
            ->select('cleansings.*')
            ->where('users.id', 'like', $user->id)
            ->get();

        return response()->json(['cleansing' => $cleansing]);
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


            $grid = Grid::whereRaw($request->lat . " BETWEEN lat_min AND lat_max")
                        ->whereRaw($request->lon . " BETWEEN long_min AND long_max")
                        ->first();

            $user = User::where('auth_token', 'like', $request->auth_token)->where('role', 'like', 'volunteer')->first();

            if ($user === null) return response()->json([], 401);
            if ($grid === null) return response()->json([], 401);

            $image_path = 'http://192.168.43.193:8000/' . str_replace('public', 'storage', $request->image->store('public'));

            $client = new \GuzzleHttp\Client(['verify' => false]);

            $params = [
                'query' => [
                  'key' => \config('apikeys.BING_API_KEY'),
                  'points' => $request->lat . ',' . $request->lon,
                ]
            ];

            $bing = $client->get('https://dev.virtualearth.net/REST/v1/Routes/SnapToRoad', $params);
            $response = $bing->getBody();
            $json_response = json_decode($response);
            $result = isset($json_response->resourceSets[0]->resources[0]->snappedPoints[0]) ? $json_response->resourceSets[0]->resources[0]->snappedPoints[0] : null;

            $cleansing = Cleansing::create([
                "image_path" => $image_path,
                'lat' => $request->lat,
                'lon' => $request->lon,
                'title' => $request->title,
                'desc' => $request->desc,
                'creator_id' => $user->id,
                'grid_id' => $grid->id,
                'event_time' => $request->event_time,
                'published' => false,
                'declined' => false,
                'location_name' => isset($result->name) ? $result->name : '',
            ]);
        }

        return response()->json(['cleansing' => $cleansing], 201);
    }

    public function publish(Request $request) {
        $validator = Validator::make($request->all(),[
            'id' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([], 401);
        }

        $cleansing = Cleansing::find($request->id);
        $cleansing->published = true;
        $cleansing->save();

        return response()->json(['cleansing' => $cleansing], 201);
    }

    public function decline(Request $request) {
        $validator = Validator::make($request->all(),[
            'id' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([], 401);
        }

        $cleansing = Cleansing::find($request->id);
        $cleansing->declined = true;
        $cleansing->save();

        return response()->json(['cleansing' => $cleansing], 201);
    }
}
