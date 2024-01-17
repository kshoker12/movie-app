<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Http;

use Inertia\Inertia;

use App\ViewModels\MoviesViewModel;
use App\ViewModels\MovieViewModel;

class MoviesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $popularMovies = Http::withToken(config('services.tmbd.token'))->get('https://api.themoviedb.org/3/movie/popular')->json()["results"];

        $genres = Http::withToken(config('services.tmbd.token'))->get('https://api.themoviedb.org/3/genre/movie/list')->json()['genres'];

        $nowPlaying = Http::withToken(config('services.tmbd.token'))->get('https://api.themoviedb.org/3/movie/now_playing')->json()['results'];

        $topRated = Http::withToken(config('services.tmbd.token'))->get('https://api.themoviedb.org/3/movie/top_rated')->json()['results'];
        
        $upcoming = Http::withToken(config('services.tmbd.token'))->get('https://api.themoviedb.org/3/movie/upcoming')->json()['results'];
        $viewModel = new MoviesViewModel(
            $popularMovies,
            $nowPlaying,
            $genres,
            $topRated,
            $upcoming,
        );

        return Inertia::render('Movies/Index', $viewModel);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    public function search($text)
    {
        $data = Http::withToken(config('services.tmbd.token'))->get('https://api.themoviedb.org/3/search/movie?query='.$text)->json()['results'];
        return response()->json($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $movie = Http::withToken(config('services.tmbd.token'))->get('https://api.themoviedb.org/3/movie/'.$id.'?append_to_response=credits,videos,images')->json();
        
        $viewModel = new MovieViewModel($movie);

        return Inertia::render('Movies/Show', $viewModel);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
