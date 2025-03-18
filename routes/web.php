<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PokemonController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('pokemon');
});

Route::post('/pokemon/search', [PokemonController::class, 'search']);
Route::get('/pokemon/random', [PokemonController::class, 'getRandomPair']);
Route::post('/pokemon/vote', [PokemonController::class, 'vote']);
Route::get('/pokemon/list', [PokemonController::class, 'list']);