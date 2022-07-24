<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\VolunteerRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function auth(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'auth_token' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([], 401);
        }

        $user = User::where('auth_token', 'like', $request->auth_token)->first();

        if (!$user) return response()->json([], 401);;

        $volunteerRequest = VolunteerRequest::where('user_id', $user->id)->where('declined', false)->first();

        $result = (object)[];
        $result->user = $user;
        $result->hasRequest = $volunteerRequest ? true : false;
        return response()->json($result, 201);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string',
            'name' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([], 401);
        }

        $auth_token = md5(rand(1, 10) . microtime());

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'role' => 'user',
            'auth_token' => $auth_token,
            'points' => 0,
        ]);

        $result = (object)[];
        $result->auth_token = $auth_token;
        $result->role = 'user';

        return response()->json($result, 201);
    }

    public function register_employee(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string',
            'name' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([], 401);
        }

        $auth_token = md5(rand(1, 10) . microtime());

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'role' => 'employee',
            'auth_token' => $auth_token,
            'points' => 0,
        ]);

        return response()->json([], 201);
    }

    public function register_admin(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string',
            'name' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([], 401);
        }

        $auth_token = md5(rand(1, 10) . microtime());

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'role' => 'admin',
            'auth_token' => $auth_token,
            'points' => 0,
        ]);

        $result = (object)[];
        $result->auth_token = $auth_token;
        $result->role = 'admin';

        return response()->json($result, 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([], 401);
        }

        $user = User::where('email', 'like', $request->email)->where('password', 'like', $request->password)->first();

        if (!$user) {
            return response()->json(['message' => 'User does not exist'], 401);
        }

        $result = (object)[];
        $result->auth_token = $user->auth_token;
        $result->role = $user->role;

        return response()->json($result, 201);
    }

    public function demote_user(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'user_id' => 'numeric'
        ]);

        $user = User::find($request->user_id);

        if (!$user) {
            return response()->json(['message' => 'User does not exist'], 401);
        }

        $user->role = 'user';
        $user->save();

        return response()->json(['message' => 'Success'], 201);
    }

    public function list_employees()
    {
        $users = User::where('role', 'like', 'employee')->orWhere('role', 'like', 'admin')->get();

        return response()->json(['users' => $users], 201);
    }

    public function list_volunteers()
    {
        $users = User::where('role', 'like', 'volunteer')->get();

        return response()->json(['volunteers' => $users], 201);
    }
}
