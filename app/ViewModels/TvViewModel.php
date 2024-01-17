<?php

namespace App\ViewModels;

use Spatie\ViewModels\ViewModel;
use Carbon\Carbon;

class TvViewModel extends ViewModel
{
    public $popularTv;
    public $topRatedTv;
    public $genres;

    public function __construct($popularTv, $topRatedTv, $genres)
    {
        $this->popularTv = $popularTv;
        $this->topRatedTv = $topRatedTv;
        $this->genres = $genres;
    }

    public function popularTv() {
        return $this->formatTv($this->popularTv);
    }

    public function topRatedTv() {
        return $this->formatTv($this->topRatedTv);
    }

    public function genres() {
        return collect($this->genres)->mapWithKeys(function($genre) {
            return [$genre['id'] => $genre['name']];
        });
    }
    
    private function formatTv($tv) {
        return collect($tv)->map(function($tvshow) {
            return collect($tvshow)->merge([
                'poster_path' => "https://image.tmdb.org/t/p/w500".$tvshow["poster_path"],
                'vote_average' => number_format($tvshow['vote_average'] * 10, 0) . "%",
                'first_air_date' => Carbon::parse($tvshow['first_air_date'])->format('M d, Y'),
                'genres' => $this->formatGenres($tvshow),
            ])->only([
                'poster_path',
                'id',
                'name',
                'vote_average',
                'overview',
                'first_air_date',
                'genres',
                'genres_id'
            ]);
        });
    }

    private function formatGenres($tvshow) {
        return $tvshow = collect($tvshow['genre_ids'])->mapWithKeys(function($value) {
            return [$value => $this->genres()->get($value)];
        })->implode(', ');
    }
}