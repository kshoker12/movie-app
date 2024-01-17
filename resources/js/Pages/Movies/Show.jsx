import React, { useState } from 'react' 
import { Head } from '@inertiajs/react'
import Main from '../Main'

export default function Show({movie}) {
  const [showTrailer, setShowTrailer] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [imagePath, setImagePath] = useState("");

  function Content() {
    return (
      <>
      <div className="movie-info border-b border-gray-800">
        <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row">
          <img src={movie.poster_path} alt="" className = "lg:w-96 w-64"/>
          <div className="md:ml-24">
            <h2 className="text-4xl font-semibold">{movie.title}</h2>
            <div className="flex flex-wrap items-center text-gray-400 text-sm">
              <i className="fas fa-star fill-current text-orange-500 w-4"/>
              <span className='ml-1'>{movie.vote_average}</span>
              <span className='mx-2'>|</span>
              <span>{movie.release_date}</span>
              <span className='mx-2'>|</span>
              <span className=''>
                {movie.genres}
              </span>
            </div>
            <p className="text-gray-300 mt-8">
              {movie.overview}
            </p>
            <div className="mt-12">
              <h4 className="text-white font-semibold">Featured Cast</h4>
              <div className="flex mt-4">
                {movie.crew.map((member)=>{
                  return (
                    <div className="mr-8">
                      <div className="">{member.name}</div>
                      <div className="text-sm text-gray-400">{member.known_for_department}</div>
                    </div> 
                  )
                })}
              </div>
            </div>
            {movie.trailer_path && 
            <div className="mt-12">
              <button onClick={()=>{
                setShowTrailer(true)
              }} className="flex inline-flex items-center bg-orange-500 text-gray-900 rounded font-semibold px-5 py-4 hover:bg-orange-600 transition ease-in-out duration-150">
                <i className="w-6 fill-current fas fa-play-circle"/>
                <span className="ml-2">Play Trailer</span>
              </button>
            </div>}
            {showTrailer &&
            <div
                style={{backgroundColor: "rgba(0, 0, 0, .5)"}}
                class="fixed top-0 left-0 w-full h-full flex items-center shadow-lg overflow-y-auto"
            >
                <div class="container mx-auto lg:px-32 rounded-lg overflow-y-auto">
                    <div class="bg-gray-900 rounded">
                        <div class="flex justify-end pr-4 pt-2">
                            <button
                                onClick={()=>{setShowTrailer(false)}}
                                class="text-3xl leading-none hover:text-gray-300">&times;
                            </button>
                        </div>
                        <div class="modal-body px-8 py-8">
                            <div class="responsive-container overflow-hidden relative" style={{paddingTop: "56.25%"}}>
                                <iframe class="responsive-iframe absolute top-0 left-0 w-full h-full" src={movie.trailer_path} style={{border:0}} allow="autoplay; encrypted-media" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
          </div>
        </div>
      </div>
      <div className="movie-cast border-b border-gray-800">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-semibold">Cast</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {movie.cast.map((member)=>{
              return (
                <div className="mt-8">
                  <a href={route("actors.show", member.id)}>
                    <img src={member.profile_path} class="hover:opacity-75 transition ease-in-out duration-150"/>
                  </a>
                  <div className="mt-2">
                    <a href = {route("actors.show", member.id)} className ="text-lg mt-2 hover:text-gray:300">
                      {member.name}
                    </a>
                    <div class="text-sm text-gray-400">
                      {member.character}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="movie-cast border-b border-gray-800">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-semibold">Images</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {movie.images.map((image)=>{
              return (
                <div class="mt-8">
                  <button onClick={()=>{
                    setImagePath(image.file_path);
                    setShowImage(true)
                  }}>
                    <img src= {image.file_path} alt="image1" class="hover:opacity-75 transition ease-in-out duration-150"/>
                  </button>
                </div>  
                )
            })}
          </div>
          {showImage &&
            <div
                style={{backgroundColor: "rgba(0, 0, 0, .5)"}}
                class="fixed top-0 left-0 w-full h-full flex items-center shadow-lg overflow-y-auto"
            >
                <div class="container mx-auto lg:px-32 rounded-lg overflow-y-auto">
                    <div class="bg-gray-900 rounded">
                        <div class="flex justify-end pr-4 pt-2">
                            <button
                                onClick={()=>{setShowImage(false)}}
                                class="text-3xl leading-none hover:text-gray-300">&times;
                            </button>
                        </div>
                        <div class="modal-body px-8 py-8">
                          <img class="" src = {imagePath} style={{border:0, width: "100%", height: "100%", objectFit: "cover"}}/>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
      </div>
      </>
    )
  }
  return (
    <Main Item = {Content} current={"Movies"}/>
  )
}
