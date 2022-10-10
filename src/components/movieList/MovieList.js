import React , { useState , useEffect } from 'react'
import Card from '../card/Card'
import "./movieList.css"
import { useParams } from "react-router-dom"
import axios from "axios"


const MovieList = () => {

    const [movieList, setMovieList] = useState([])

    const { type } = useParams()

    const fetchData = async() => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        setMovieList(data.results);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [type]);

  

    

  return (
    <div className='movie_list'>
        <div className="options">
            <h2 className='movie_title'>{(type ? type : "POPULAR").toUpperCase()} </h2>
          
        </div>
       
        <div className="list_cards">

            {
                movieList.map(movie => (
                    <div className='movie_card'>
                        <Card movie={movie} />
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default MovieList