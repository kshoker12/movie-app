<?php

namespace App\ViewModels;

use Spatie\ViewModels\ViewModel;
use Carbon\Carbon;

class MoviesViewModel extends ViewModel
{
    public $popularMovies;
    public $nowPlaying;
    public $topRated;
    public $upcoming;
    public $genres;

    public function __construct($popularMovies, $nowPlaying, $genres, $topRated, $upcoming)
    {
        $this->popularMovies = $popularMovies;
        $this->nowPlaying = $nowPlaying;
        $this->genres = $genres;
        $this->topRated = $topRated;
        $this->upcoming = $upcoming;
    }

    public function popularMovies() {
        return $this->formatMovies($this->popularMovies);
    }

    public function nowPlaying() {
        return $this->formatMovies($this->nowPlaying);
    }

    public function topRated() {
        return $this->formatMovies($this->topRated);
    }

    public function upcoming() {
        return $this->formatMovies($this->upcoming);
    }

    public function genres() {
        return collect($this->genres)->mapWithKeys(function($genre) {
            return [$genre['id'] => $genre['name']];
        });
    }
    
    private function formatMovies($movies) {
        return collect($movies)->map(function($movie) {
            return collect($movie)->merge([
                'poster_path' => "https://image.tmdb.org/t/p/w500".$movie["poster_path"],
                'vote_average' => number_format($movie['vote_average'] * 10, 0) . "%",
                'release_date' => Carbon::parse($movie['release_date'])->format('M d, Y'),
                'genres' => $this->formatGenres($movie),
            ])->only([
                'poster_path',
                'id',
                'title',
                'vote_average',
                'overview',
                'release_date',
                'genres',
                'genres_id'
            ]);
        });
    }

    private function formatGenres($movie) {
        return $genresFormatted = collect($movie['genre_ids'])->mapWithKeys(function($value) {
            return [$value => $this->genres()->get($value)];
        })->implode(', ');
    }
}

