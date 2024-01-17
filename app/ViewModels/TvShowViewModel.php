<?php

namespace App\ViewModels;

use Spatie\ViewModels\ViewModel;
use Carbon\Carbon;

class TvShowViewModel extends ViewModel
{
    public $show;

    public function __construct($show)
    {
        $this->show = $show;
    }

    public function show() {
        return $this->formatShow($this->show);
    }

    private function formatShow($show) {
        return collect($show)->merge([
            "poster_path" => $show["poster_path"] ? "https://image.tmdb.org/t/p/w500".$show["poster_path"]: "https://via.placeholder.com/185x278",
            'vote_average' => number_format($show['vote_average'] * 10, 0) . "%",
            'first_air_date' => Carbon::parse($show['first_air_date'])->format('M d, Y'),
            'trailer_path' => $show['videos']['results'] ? 'https://www.youtube.com/embed/'.$show['videos']['results'][0]['key']: null,
            'images' => collect($this->formatImagesPath($show))->take(9),
            'cast' => collect($this->formatCredits($show))->take(5),
            "crew" => collect($this->show["credits"]["crew"])->take(2),
            'genres' => collect($this->show["genres"])->pluck("name")->flatten()->implode(", "),
        ])->only(
            "id",
            "poster_path",
            "videos",
            "vote_average",
            "first_air_date",
            "trailer_path",
            "images",
            "cast",
            "crew",
            "genres",
            "name",
            "overview",
            "created_by"
        );
    }

    private function formatCredits($show) {
        $castFormatted = array_map(function($member) {
            $member['profile_path'] = "https://image.tmdb.org/t/p/w500".$member['profile_path'];
            return $member;
        }, $show['credits']["cast"]);
        return $castFormatted;
    }

    private function formatImagesPath($show) {
        $imagesFormatted = array_map(function($backdrop) {
            $backdrop['file_path'] = "https://image.tmdb.org/t/p/w500".$backdrop['file_path'];
            return $backdrop;
        }, $show['images']["backdrops"]);
        return $imagesFormatted;
    }
}
