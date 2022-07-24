<?php

namespace App\Http\Controllers;

use App\Models\VolunteerRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class VolunteerRequestController extends Controller
{
    public function index() {

        $volunteerRequests = DB::table('volunteer_requests')
        ->join('users', 'users.id', '=', 'volunteer_requests.user_id')
        ->select('volunteer_requests.id', 'users.name', 'users.email')
        ->where('volunteer_requests.accepted', false)
        ->where('volunteer_requests.declined', false)
        ->get();

        return response()->json(['volunteerRequests' => $volunteerRequests]);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'auth_token' => 'required|string',
        ]);

        $user = User::where('auth_token', 'like', $request->auth_token)->first();

        if ($user === null) return response()->json([], 401);

       $volunteerRequest = VolunteerRequest::create([
            'user_id' => $user->id,
            'accepted' => false,
            'declined' => false,
        ]);

        $volunteerRequest->user = $user;

        return response()->json(['volunteerRequest' => $volunteerRequest], 201);
    }

    public function accept(Request $request) {
        $validator = Validator::make($request->all(),[
            'id' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([], 401);
        }

        $volunteerRequest = VolunteerRequest::find($request->id);
        $volunteerRequest->accepted = true;
        $volunteerRequest->save();

        $user = User::find($volunteerRequest->user_id);
        $user->role = 'volunteer';
        $user->save();


        $volunteerRequests = DB::table('volunteer_requests')
        ->join('users', 'users.id', '=', 'volunteer_requests.user_id')
        ->select('volunteer_requests.id', 'users.name', 'users.email')
        ->where('volunteer_requests.id', 'like', $request->id)
        ->get();

        return response()->json(['volunteerRequest' => $volunteerRequests], 201);
    }

    public function decline(Request $request) {
        $validator = Validator::make($request->all(),[
            'id' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([], 401);
        }

        $report = VolunteerRequest::find($request->id);
        $report->declined = true;
        $report->save();

        $volunteerRequests = DB::table('volunteer_requests')
        ->join('users', 'users.id', '=', 'volunteer_requests.user_id')
        ->select('volunteer_requests.id', 'users.name', 'users.email')
        ->where('volunteer_requests.id', 'like', $request->id)
        ->get();

        return response()->json(['volunteerRequest' => $volunteerRequests], 201);
    }
}
