import React, { useEffect, useState } from 'react'
import { Head } from '@inertiajs/react';
import axios from 'axios';

export default function Main({Item, current}) {
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false);

    
    const inputField = document.getElementById('searchBar');

    document.addEventListener('click', (event) => {
        const isClickedInsideInput = inputField.contains(event.target);
        if (!isClickedInsideInput) {
            setShow(false);
        }
    });

    useEffect(()=>{
        const interval = setInterval(()=>{
            ObtainSearch();
        }, 1000)

        return () => {
            clearInterval(interval);
        }
    }, [search, searchResults, loading, show])

    async function ObtainSearch() {
        if (search.length > 1) {
            let url = null;
            switch(current) {
                case "TV Shows":
                    url = route("tv.search", search);
                    break;
                case "Movies":
                    url = route('movies.search', search);
                    break;
                case "Actors":
                    url = route("actors.search", search);
                    break;
                default:
                    break;
            }
            await axios.get(url)
            .then(response => {
                console.log(response.data);
                setSearchResults(response.data)
            }).catch(error => {
                console.error(error)
            });   
            setLoading(false); 
        } else {
            setLoading(false);
            setSearchResults([]);
        }
    }

    function RenderSearch() {
        if (search.length > 0 && show) {
            if (searchResults.length > 0) {
                let results = [];
                for (let i = 0; i < 7; i++) {
                    if (i < searchResults.length) {
                        let movie = searchResults[i];
                        if (movie.poster_path) {
                            results.push(
                                <li className="border-b border-gray-700">
                                    <a href={route("movies.show", movie.id)} className="block hover:bg-gray-700 px-3 py-3 flex items-center">
                                        <img src={"https://image.tmdb.org/t/p/w92" + movie.poster_path} alt="" className='w-8'/>
                                        <span className="ml-4">{movie.title}</span>
                                    </a>
                                </li>
                            ) 
                        } else {
                            results.push(
                                <li className="border-b border-gray-700">
                                    <a href={route("movies.show", movie.id)} className="block hover:bg-gray-700 px-3 py-3 flex items-center">
                                        <img src={"https://via.placeholder.com/50x75"} alt="" className='w-8'/>
                                        <span className="ml-4">{movie.title}</span>
                                    </a>
                                </li>
                            ) 
                        } 
                    } else {
                        break;
                    }
                } 
                return (
                    <ul>
                        {results}    
                    </ul>
                )
            } else if (loading) {
                return (
                    <div className=""></div>
                )
            } else {
                return (
                    <div className="px-3 py-3">No results for {search}</div>
                )
            }
        }
    }

    function RenderTvSearch() {
        if (search.length > 0 && show) {
            if (searchResults.length > 0) {
                let results = [];
                for (let i = 0; i < 7; i++) {
                    if (i < searchResults.length) {
                        let tv = searchResults[i];
                        if (tv.poster_path) {
                            results.push(
                                <li className="border-b border-gray-700">
                                    <a href={route("tv.show", tv.id)} className="block hover:bg-gray-700 px-3 py-3 flex items-center">
                                        <img src={"https://image.tmdb.org/t/p/w92" + tv.poster_path} alt="" className='w-8'/>
                                        <span className="ml-4">{tv.name}</span>
                                    </a>
                                </li>
                            ) 
                        } else {
                            results.push(
                                <li className="border-b border-gray-700">
                                    <a href={route("tv.show", tv.id)} className="block hover:bg-gray-700 px-3 py-3 flex items-center">
                                        <img src={"https://via.placeholder.com/50x75"} alt="" className='w-8'/>
                                        <span className="ml-4">{tv.name}</span>
                                    </a>
                                </li>
                            ) 
                        } 
                    } else {
                        break;
                    }
                } 
                return (
                    <ul>
                        {results}    
                    </ul>
                )
            } else if (loading) {
                return (
                    <div className=""></div>
                )
            } else {
                return (
                    <div className="px-3 py-3">No results for {search}</div>
                )
            }
        }
    }

    function RenderActors() {
        if (search.length > 0 && show) {
            if (searchResults.length > 0) {
                let results = [];
                for (let i = 0; i < 7; i++) {
                    if (i < searchResults.length) {
                        let actor = searchResults[i];
                        if (actor.profile_path) {
                            results.push(
                                <li className="border-b border-gray-700">
                                    <a href={route("actors.show", actor.id)} className="block hover:bg-gray-700 px-3 py-3 flex items-center">
                                        <img src={"https://image.tmdb.org/t/p/w92" + actor.profile_path} alt="" className='w-8'/>
                                        <span className="ml-4">{actor.name}</span>
                                    </a>
                                </li>
                            ) 
                        } else {
                            results.push(
                                <li className="border-b border-gray-700">
                                    <a href={route("actors.show", actor.id)} className="block hover:bg-gray-700 px-3 py-3 flex items-center">
                                        <img src={"https://via.placeholder.com/50x75"} alt="" className='w-8'/>
                                        <span className="ml-4">{actor.name}</span>
                                    </a>
                                </li>
                            ) 
                        } 
                    } else {
                        break;
                    }
                } 
                return (
                    <ul>
                        {results}    
                    </ul>
                )
            } else if (loading) {
                return (
                    <div className=""></div>
                )
            } else {
                return (
                    <div className="px-3 py-3">No results for {search}</div>
                )
            }
        }
    }

    

  return (
    <div>
        <Head title = {current}></Head>   
            <body className="font-sans bg-gray-900 text-white">
                <nav className='border-b border-gray-800'>
                    <div className="container mx-auto flex flex-col md:flex-row  items-center justify-between px-4 py-6">
                        <ul className="flex flex-col md:flex-row items-center">
                            <li>
                                <a href={route("movies.index")}>
                                    <svg class="w-32" viewBox="0 0 96 24" fill="none"><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4zM35.568 7.047l2.557 7.219 2.543-7.22h2.693V17h-2.057v-2.72l.205-4.697L38.822 17h-1.408l-2.68-7.41.206 4.69V17h-2.051V7.047h2.68zm9.147 6.186c0-.733.141-1.387.424-1.962a3.108 3.108 0 011.216-1.333c.534-.314 1.151-.471 1.853-.471.998 0 1.812.305 2.44.916.634.61.987 1.44 1.06 2.488l.014.506c0 1.135-.317 2.046-.95 2.734-.634.684-1.484 1.026-2.55 1.026-1.067 0-1.919-.342-2.557-1.026-.633-.683-.95-1.613-.95-2.789v-.089zm1.975.144c0 .702.133 1.24.397 1.613.264.37.642.554 1.135.554.478 0 .852-.182 1.12-.547.27-.37.404-.957.404-1.764 0-.688-.134-1.221-.403-1.6-.27-.377-.647-.567-1.135-.567-.483 0-.857.19-1.121.568-.264.373-.397.954-.397 1.743zm8.908 1.21l1.374-4.983h2.064L56.541 17h-1.887L52.16 9.604h2.065l1.374 4.983zM61.996 17h-1.982V9.604h1.982V17zm-2.099-9.31c0-.297.098-.54.294-.732.2-.191.472-.287.814-.287.337 0 .606.096.806.287.201.191.301.435.301.731 0 .301-.102.547-.307.739-.2.191-.467.287-.8.287s-.602-.096-.807-.287a.975.975 0 01-.3-.739zm7.137 9.447c-1.085 0-1.969-.333-2.652-.998-.68-.666-1.019-1.552-1.019-2.66v-.19c0-.744.144-1.407.43-1.99a3.143 3.143 0 011.218-1.354c.528-.319 1.13-.478 1.804-.478 1.012 0 1.807.319 2.386.957.584.638.875 1.543.875 2.714v.806h-4.71c.064.483.255.87.574 1.162.324.292.732.438 1.224.438.761 0 1.356-.276 1.784-.827l.97 1.087a2.99 2.99 0 01-1.202.984 3.98 3.98 0 01-1.682.349zm-.225-6.07c-.392 0-.711.132-.957.396-.242.264-.397.643-.465 1.135h2.748v-.158c-.01-.437-.128-.774-.356-1.011-.228-.242-.551-.363-.97-.363zm10.144 3.882h-3.596L72.674 17h-2.18l3.704-9.953h1.9L79.825 17h-2.18l-.69-2.05zm-3.042-1.66H76.4l-1.25-3.726-1.238 3.725zm13.043.081c0 1.14-.26 2.053-.78 2.741-.514.684-1.211 1.026-2.091 1.026-.747 0-1.351-.26-1.811-.78v3.487h-1.976V9.604h1.832l.068.724c.479-.574 1.103-.861 1.873-.861.912 0 1.62.337 2.126 1.011.506.675.76 1.605.76 2.79v.102zm-1.975-.143c0-.689-.123-1.22-.37-1.593-.241-.374-.594-.56-1.06-.56-.619 0-1.045.236-1.278.71v3.028c.242.488.673.732 1.293.732.943 0 1.415-.773 1.415-2.317zm9.864.143c0 1.14-.26 2.053-.78 2.741-.514.684-1.212 1.026-2.091 1.026-.748 0-1.352-.26-1.812-.78v3.487h-1.975V9.604h1.832l.068.724c.479-.574 1.103-.861 1.873-.861.912 0 1.62.337 2.126 1.011.506.675.759 1.605.759 2.79v.102zm-1.976-.143c0-.689-.123-1.22-.369-1.593-.242-.374-.595-.56-1.06-.56-.62 0-1.045.236-1.278.71v3.028c.242.488.672.732 1.292.732.944 0 1.415-.773 1.415-2.317z" fill="#fff"/></svg>
                                </a>
                            </li>
                            <li className='md:ml-16 mt-3 md:mt-0'>
                                <a href={route("movies.index")} className='hover:text-gray-300'>
                                    Movies
                                </a>
                            </li>
                            <li className='md:ml-6 mt-3 md:mt-0'>
                                <a href={route("tv.index")} className='hover:text-gray-300'>
                                    TV Shows
                                </a>
                            </li>
                            <li className='md:ml-6 mt-3 md:mt-0'>
                                <a href={route("actors.index")} className='hover:text-gray-300'>
                                    Actors
                                </a>
                            </li>
                        </ul>
                        <div className="flex flex-col md:flex-row items-center" >
                            <div id = "searchBar" className="relative mt-3 md:mt-0">
                                <input type="text" onChange = {(e)=>{
                                setSearch(e.target.value);
                                if (search.length > 0) {
                                    setLoading(true);
                                }
                                }} 
                                onClick={()=>{
                                    setShow(true)
                                }}
                                className="bg-gray-800 rounded-full w-64 px-4 py-1 pl-8 focus:outline-none focus:shadow-outline text-sm" placeholder='Search'/>
                                <div className="absolute top-0">
                                    <button>
                                        <i className="fas fa-search fill-current text-gray-500 w-4 mt-2 ml-2"/>      
                                    </button>                     
                                </div>
                                {loading && <div className="spinner top-0 right-0 mr-4 mt-4"></div>}
                                <div className="absolute bg-gray-800 text-sm rounded w-64 mt-2">
                                    {current === "Movies" ? 
                                        <RenderSearch/>
                                    : 
                                    current === "TV Shows" ? 
                                        <RenderTvSearch/>
                                    :
                                        <RenderActors/>
                                    }
                                </div>
                            </div>
                            <div className="md:ml-4 mt-3 md:mt-0">
                                <a href="#">
                                    <img src="/img/Self.jpg" alt="" className='rounded-full w-8 h-8'/>
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>  
                <Item/>
            </body>
        </div>
  )
}
