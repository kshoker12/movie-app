<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

use App\ViewModels\TvViewModel;
use App\ViewModels\TvShowViewModel;

class TvController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $popularTv = Http::withToken(config('services.tmbd.token'))->get('https://api.themoviedb.org/3/tv/popular')->json()['results'];

        $genres = Http::withToken(config('services.tmbd.token'))->get('https://api.themoviedb.org/3/genre/tv/list')->json()['genres'];

        $topRatedTv = Http::withToken(config('services.tmbd.token'))->get('https://api.themoviedb.org/3/tv/top_rated')->json()['results'];

        $viewModel = new TvViewModel(
            $popularTv,
            $topRatedTv,
            $genres
        );

        return Inertia::render('TV/Index', $viewModel);
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

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $tv = Http::withToken(config('services.tmbd.token'))->get('https://api.themoviedb.org/3/tv/'.$id.'?append_to_response=credits,videos,images')->json();
        
        $viewModel = new TvShowViewModel($tv);

        return Inertia::render("TV/Show", $viewModel);
    }

    public function search($text)
    {
        $data = Http::withToken(config('services.tmbd.token'))->get('https://api.themoviedb.org/3/search/tv?query='.$text)->json()['results'];
        return response()->json($data);
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
