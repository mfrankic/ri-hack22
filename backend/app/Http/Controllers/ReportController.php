<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\Grid;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index() {
        $reports = Report::where('accepted', false)->where('declined', false)->get();

        return response()->json(['reports' => $reports], 201);
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

            $user = User::where('auth_token', 'like', $request->auth_token)->first();

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


            $report = Report::create([
                "image_path" => $image_path,
                'accepted' => false,
                'declined' => false,
                'resolved' => false,
                'lat' => $request->lat,
                'lon' => $request->lon,
                'type' => $request->type,
                'user_id' => $user->id,
                'grid_id' => $grid->id,
                'location_name' => isset($result->name) ? $result->name : '',
            ]);
        }

        return response()->json(['report' => $report], 201);
    }

    public function accept(Request $request) {
        $validator = Validator::make($request->all(),[
            'id' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([], 401);
        }

        $report = Report::find($request->id);
        $report->accepted = true;
        $report->save();

        $user = User::find($report->user_id);
        $user->points += 50;
        $user->save();

        return response()->json(['report' => $report], 201);
    }

    public function decline(Request $request) {
        $validator = Validator::make($request->all(),[
            'id' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([], 401);
        }

        $report = Report::find($request->id);
        $report->declined = true;
        $report->save();

        return response()->json(['report' => $report], 201);
    }

    public function resolve(Request $request) {
        $validator = Validator::make($request->all(),[
            'id' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([], 401);
        }

        $report = Report::find($request->id);
        $report->resolved = true;
        $report->save();

        return response()->json(['report' => $report], 201);
    }
}
