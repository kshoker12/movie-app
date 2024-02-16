<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MoviesController;
use App\Http\Controllers\ActorsController;
use App\Http\Controllers\TvController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION
//     ]);
// });

Route::get('/', [MoviesController::class, 'index'])->name('movies.index');
Route::get('/movies/{movie}', [MoviesController::class, 'show'])->name('movies.show');

Route::get('/search/{text}', [MoviesController::class, 'search'])->name('movies.search');

Route::get('/tv/search/{text}', [TvController::class, 'search'])->name('tv.search');

Route::get('/actors/search/{text}', [ActorsController::class, 'search'])->name('actors.search');

Route::get('/actors', [ActorsController::class, 'index'])->name('actors.index');
Route::get('/actors/page/{page?}', [ActorsController::class, 'page'])->name("actors.page");
Route::get('/actors/{actor}', [ActorsController::class, 'show'])->name('actors.show');

Route::get('/tv', [TvController::class, 'index'])->name('tv.index');
Route::get('/tv/{tv}', [TvController::class, 'show'])->name('tv.show');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';