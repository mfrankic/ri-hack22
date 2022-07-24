<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\CleansingController;
use App\Http\Controllers\VolunteerRequestController;
use App\Http\Controllers\NotifsController;
use App\Http\Controllers\UserEventController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/user/login', [UserController::class, 'login']);
Route::post('/user/register', [UserController::class, 'register']);
Route::post('/user/register_employee', [UserController::class, 'register_employee']);
Route::post('/user/register_admin', [UserController::class, 'register_admin']);
Route::put('/user/demote_user', [UserController::class, 'demote_user']);
Route::get('/user/auth', [UserController::class, 'auth']);
Route::get('/user/list_employees', [UserController::class, 'list_employees']);
Route::get('/user/list_volunteers', [UserController::class, 'list_volunteers']);

Route::post('/reports/create', [ReportController::class, 'create']);
Route::get('/reports', [ReportController::class, 'index']);
Route::put('/reports/accept', [ReportController::class, 'accept']);
Route::put('/reports/resolve', [ReportController::class, 'resolve']);
Route::put('/reports/decline', [ReportController::class, 'decline']);

Route::post('/cleansing/create', [CleansingController::class, 'create']);
Route::get('/cleansing', [CleansingController::class, 'index']);
Route::get('/history', [CleansingController::class, 'history']);
Route::get('/cleansings', [CleansingController::class, 'cleansings']);
Route::put('/cleansing/publish', [CleansingController::class, 'publish']);
Route::put('/cleansing/decline', [CleansingController::class, 'decline']);

Route::post('/volunteerRequest/create', [VolunteerRequestController::class, 'create']);
Route::get('/volunteerRequest', [VolunteerRequestController::class, 'index']);
Route::put('/volunteerRequest/accept', [VolunteerRequestController::class, 'accept']);
Route::put('/volunteerRequest/decline', [VolunteerRequestController::class, 'decline']);

Route::post('/notifs/create', [NotifsController::class, 'create']);
Route::get('/notifs', [NotifsController::class, 'index']);
Route::put('/notifs/update', [NotifsController::class, 'update']);

Route::post('/user_event/create', [UserEventController::class, 'create']);
