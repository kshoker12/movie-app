import React from 'react'
import { Head } from '@inertiajs/react';
import Main from '../Main';

export default function Index({popularTv, topRatedTv}) {

    console.log("TV SHOW");
    console.log(popularTv);
    function TvCard({show}) {
        return (
            <div className="mt-8">
                <a href={route("tv.show", show.id)}>
                    <img src={show.poster_path} alt="" className='hover:opacity-75 transition ease-in-out duration-150'/>
                </a>
                <div className="mt-2">
                    <a href={route("tv.show", show.id)} className="text-lg mt-2 hover:text-gray-300">
                        {show.name}
                    </a>
                    <div className="flex items-center text-gray-400 text-sm mt-1">
                        <i className="fas fa-star fill-current text-orange-500 w-4"/>
                        <span className='ml-1'>{show.vote_average}</span>
                        <span className='mx-2'>|</span>
                        <span>{show.first_air_date}</span>
                    </div>
                    <div className="text-gray-400">
                        {show.genres}
                    </div>
                </div>
            </div>
        )
    }

    function Shows() {
        return (
            <div className="container mx-auto px-4">
                <div id = "top" className="flex mx-auto text-xl font-bold space-x-4">
                    <a href = "#popular" className ="text-orange-500 hover:text-blue-500">
                        <h2>Popular</h2>
                    </a>
                    <a href="#topRated" className='text-orange-500 hover:text-blue-500'>
                        <h2>Top Rated</h2>
                    </a>
                </div>
                <div id = "popular" className="popular-tv pt-16">
                    <h2 className="uppercase tracking-wider text-orange-500 text-lg font-semibold">
                        Popular Shows
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {popularTv.map((show)=>{
                            return <TvCard show = {show}/>
                        })}
                    </div>
                </div>
                <div id = "topRated" className="top-rated-tv pt-16">
                    <h2 className="uppercase tracking-wider text-orange-500 text-lg font-semibold">
                        Top Rated Shows
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {topRatedTv.map((show)=> {
                            return <TvCard show = {show}/>
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
    <Main Item = {Shows} current = {"TV Shows"}/>
  )
}