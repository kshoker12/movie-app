<?php

namespace App\ViewModels;

use Spatie\ViewModels\ViewModel;
use Carbon\Carbon;

class MovieViewModel extends ViewModel
{
    public $movie;

    public function __construct($movie)
    {
        $this->movie = $movie;
    }

    public function movie() {
        return $this->formatMovie($this->movie);
    }

    private function formatMovie($movie) {
        return collect($movie)->merge([
            "poster_path" => $movie["poster_path"] ? "https://image.tmdb.org/t/p/w500".$movie["poster_path"]: "https://via.placeholder.com/185x278",
            'vote_average' => number_format($movie['vote_average'] * 10, 0) . "%",
            'release_date' => Carbon::parse($movie['release_date'])->format('M d, Y'),
            'trailer_path' => $movie['videos']['results']? 'https://www.youtube.com/embed/'.$movie['videos']['results'][0]['key']: null,
            'images' => collect($this->formatImagesPath($movie))->take(9),
            'cast' => collect($this->formatCredits($movie))->take(5),
            "crew" => collect($this->movie["credits"]["crew"])->take(2),
            'genres' => collect($this->movie["genres"])->pluck("name")->flatten()->implode(", "),
        ])->only(
            "id",
            "poster_path",
            "videos",
            "vote_average",
            "release_date",
            "trailer_path",
            "images",
            "cast",
            "crew",
            "genres",
            "title",
            "overview"
        );
    }

    private function formatCredits($movie) {
        $castFormatted = array_map(function($member) {
            $member['profile_path'] = "https://image.tmdb.org/t/p/w500".$member['profile_path'];
            return $member;
        }, $movie['credits']["cast"]);
        return $castFormatted;
    }

    private function formatImagesPath($movie) {
        $imagesFormatted = array_map(function($backdrop) {
            $backdrop['file_path'] = "https://image.tmdb.org/t/p/w500".$backdrop['file_path'];
            return $backdrop;
        }, $movie['images']["backdrops"]);
        return $imagesFormatted;
    }
}
