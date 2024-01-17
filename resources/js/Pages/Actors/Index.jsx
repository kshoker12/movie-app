import React, { useState } from 'react'
import Main from '../Main'
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

export default function Index({popularActors, previous, next}) {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);

    if (items.length === 0) {
        setItems(popularActors);
        setPage(next);
    }

    const fetchData = async (__page) => {
        console.log(__page);
        let url = route("actors.page", page);
        const response = await axios.get(
            url
        );
        setItems([...items, ...response.data.popularActors]);
        setPage(page + 1)
      };



    function Content() {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="popular-actors">
                    <h2 className="uppercase tracking-wider text-orange-500 text-lg font-semibold">
                        Popular Actors
                    </h2>
                    <InfiniteScroll
                        style={{ margin: "10px" }}
                        pageStart={0}
                        loadMore={fetchData}
                        hasMore={true}
                        loader={
                            <div className="loader" key={0}>
                                <div className="flex justify-center">
                                    <div className="spinner my-8 text-4xl"></div>
                                </div>   
                            </div>
                        }
                        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8'
                    >
                        {items.map((actor, index)=>{
                                    return (
                                    <div className="actor mt-8" key = {index}>
                                        <a href={route("actors.show", actor.id)}>
                                            <img src={actor.profile_path} alt="" className='hover:opacity-75 transition ease-in-out duration-150'/>
                                        </a>
                                        <div className="mt-2">
                                            <a href={route("actors.show", actor.id)} className="text-lg hover:text-gray-300">{actor.name}</a>
                                            <div className="text-sm truncate text-gray-400">{actor.known_for}</div>
                                        </div>
                                    </div>    
                                    )
                        })}      
                    </InfiniteScroll>
                </div>
                {/* <div className="flex justify-between mt-16">
                    {previous ?
                        <a href={"/actors/page/" + previous}>Previous</a>
                    :
                        <div className=""></div>
                    }
                    {next ?
                        <a href={"/actors/page/" + next}>Next</a>
                    :
                        <div className=""></div>
                    }
                </div> */}
            </div>
        )
    }
    return (
        <Main Item = {Content} current = {"Actors"}/>
    )
}
