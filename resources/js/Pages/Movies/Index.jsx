import React from 'react'
import { Head } from '@inertiajs/react';
import Main from '../Main';

export default function Index({popularMovies, nowPlaying, topRated, upcoming}) {

    function MovieCard({movie}) {
        return (
            <div className="mt-8">
                <a href={route("movies.show", movie.id)}>
                    <img src={movie.poster_path} alt="" className='hover:opacity-75 transition ease-in-out duration-150'/>
                </a>
                <div className="mt-2">
                    <a href={route("movies.show", movie.id)} className="text-lg mt-2 hover:text-gray-300">
                        {movie.title}
                    </a>
                    <div className="flex items-center text-gray-400 text-sm mt-1">
                        <i className="fas fa-star fill-current text-orange-500 w-4"/>
                        <span className='ml-1'>{movie.vote_average}</span>
                        <span className='mx-2'>|</span>
                        <span>{movie.release_date}</span>
                    </div>
                    <div className="text-gray-400">
                        {movie.genres}
                    </div>
                </div>
            </div>
        )
    }

    function Movies() {
        return (
            <div className="container mx-auto px-4">
                <div id = "top" className="flex mx-auto text-xl font-bold space-x-4">
                    <a href = "#popular" className ="text-orange-500 hover:text-blue-500">
                        <h2>Popular</h2>
                    </a>
                    <a href="#now-playing" className='text-orange-500 hover:text-blue-500'>
                        <h2>Now Playing</h2>
                    </a>
                    <a href = "#topRated" className ="text-orange-500 hover:text-blue-500">
                        <h2>Top Rated</h2>
                    </a>
                    <a href = "#upcoming" className ="text-orange-500 hover:text-blue-500">
                        <h2>Upcoming</h2>
                    </a>
                </div>
                <div id =  "popular" className="popular-movies pt-16">
                    <h2 className="uppercase tracking-wider text-orange-500 text-lg font-semibold">
                        Popular Movies
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {popularMovies.map((movie)=>{
                            return <MovieCard movie = {movie}/>
                        })}
                    </div>
                </div>
                <div id = "now-playing" className="now-playing pt-16">
                    <h2 className="uppercase tracking-wider text-orange-500 text-lg font-semibold">
                        Now Playing
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {nowPlaying.map((movie)=> {
                            return <MovieCard movie = {movie}/>
                        })}
                    </div>
                </div>
                <div id = "topRated" className="topRated-movies pt-16">
                    <h2 className="uppercase tracking-wider text-orange-500 text-lg font-semibold">
                        Top Rated
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {topRated.map((movie)=> {
                            return <MovieCard movie = {movie}/>
                        })}
                    </div>
                </div>
                <div id = "upcoming" className="upcoming-movies pt-16">
                    <h2 className="uppercase tracking-wider text-orange-500 text-lg font-semibold">
                        Upcoming
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {upcoming.map((movie)=> {
                            return <MovieCard movie = {movie}/>
                        })}
                    </div>
                </div>
                <div className="w-full bottom-0 left-0 fixed">
                    <div className="flex justify-end">
                        <a href="#top" className="rounded-full m-4">
                            <i className="fa fa-arrow-circle-up text-orange-500 text-xl"/>    
                        </a>
                    </div>
                </div>
            </div>
        )
    }
  return (
    <Main Item = {Movies} current={"Movies"}/>
  )
}
