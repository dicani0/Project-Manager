<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\UserController;
use App\Http\Controllers\Manager\ProjectController;
use App\Http\Controllers\Manager\TaskController;
use App\Http\Controllers\Manager\TeamController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('logout', [AuthController::class, 'logout']);

    Route::get('users', [UserController::class, 'index']);

    Route::get('teams', [TeamController::class, 'index']);
    Route::post('teams/store', [TeamController::class, 'store']);
    Route::put('teams/update', [TeamController::class, 'update']);


    Route::get('projects', [ProjectController::class, 'index']);
    Route::patch('projects/update', [ProjectController::class, 'update']);
    Route::get('projects/{id}', [ProjectController::class, 'show'])->where('id', '[0-9]+');

    Route::post('tasks/store', [TaskController::class, 'store']);
    Route::patch('tasks/update', [TaskController::class, 'update']);
    Route::get('tasks/{projectId}', [TaskController::class, 'getTasksForProject']);
});


// Route::post('/register', [AuthController::class, 'register']);
