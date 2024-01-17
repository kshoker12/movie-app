import React, { useState } from 'react' 
import { Head } from '@inertiajs/react'
import Main from '../Main'

export default function Show({actor, social, credits, knownForMovies}) {
  function Content() {
    return (
        <>
            <div className="movie-info border-b border-gray-800">
                <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row">
                    <div className="flex-none">
                        <img src={actor.profile_path} alt="" className='w-72'/>
                        <ul className="flex items-center mt-4 space-x-2">
                            {social.facebook && <li>
                                <a href={social.facebook} target = "_blank" title = "Facebook">
                                    <i className="fa-brands fa-facebook-f fill-current text-gray-400 w-6 hover:text-white text-2xl"/>
                                </a>
                            </li>}
                            {social.instagram && <li>
                                <a href={social.instagram} target = "_blank" title = "Instagram">
                                    <i className="fa-brands fa-instagram fill-current text-gray-400 hover:text-white w-6 text-2xl"/>
                                </a>
                            </li>}
                            {social.twitter && <li>
                                <a href={social.twitter} target = "_blank" title = "Twitter">
                                    <i className="fa-brands fa-twitter fill-current text-gray-400 hover:text-white w-6 text-2xl"/>
                                </a>
                            </li>}
                            {actor.homepage && <li>
                                <a href={actor.homepage} target = "_blank" title = "Website">
                                    <i className="fas fa-globe-americas fill-current text-gray-400 hover:text-white w-6 text-2xl"/>
                                </a>
                            </li>}
                        </ul>    
                    </div>
                    <div className="md:ml-24">
                        <h2 className="text-4xl font-semibold">{actor.name}</h2>
                        <div className="flex flex-wrap items-center text-gray-400 text-sm">
                            <i className="fas fa-birthday-cake fill-current w-4"/>
                            <span className='ml-2'>{actor.birthday} ({actor.age} years old) in {actor.place_of_birth}</span>
                        </div>
                        <p className="text-gray-300 mt-8">
                            {actor.biography}
                        </p>
                        <h4 className="font-semibold mt-12">Known For</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                            {Object.keys(knownForMovies).map((key)=>{
                                let movie = knownForMovies[key];
                                return (
                                    <div className="mt-4">
                                        <a href={movie.linkToPage}>
                                            <img src={movie.poster_path} alt="" className="hover:opacity-75 transition ease-in-out duration-150" />
                                        </a>
                                        <a href={movie.linkToPage} className="text-sm leading-normal block text-gray-400 hover:text-white mt-1">{movie.title}</a>
                                    </div>    
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="credits border-b border-gray-800">
                <div className="container mx-auto px-4 py-16">
                    <h2 className="text-4xl font-semibold">Credits</h2>
                    <ul className="list-disc leading-loose pl-5 mt-8">
                        {Object.keys(credits).map((key)=>{
                            let movie = credits[key];
                            return (
                                <li>{movie.release_year} &middot; <a href={movie.linkToPage} className='hover:text-blue-500'><strong>{movie.title}</strong></a> as {movie.character}</li>    
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
  }

  return (
    <Main Item = {Content} current = {"Actors"}/>
  )
}
