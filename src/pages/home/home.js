import React , { useEffect, useState } from 'react';
import axios from "axios"
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom"
import { FaStar } from "react-icons/fa"
import "./home.css"

const Home = () => {

    const [popularMovie, setPopularMovie] = useState([]);

    const FetchData = async() => {
      const { data } = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US");
      setPopularMovie(data.results);
    }
   
    useEffect(() => {
      FetchData();
    }, []);


  return (
    <div className='poster'>
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={2}
          interval={3000}
          infiniteLoop={true}
          showStatus={false}
        >
         {
          popularMovie.map((movie) => (
            <>
              <Link to={`/movie/${movie.id}`}>
                  <div className="posterImage">
                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt="movie" />
                  </div>
                  <div className="posterImage_overlay">
                     <div className="posterImage_title">{movie ? movie.original_title : ""}</div>
                     <div className="posterImage_runtime">
                      {movie ? movie.release_date : ""}
                      <span className='posterImage_rating'>
                        {movie ? movie.vote_average : ""}
                        <span className="icon">{<FaStar/>}</span>
                      </span>
                     </div>

                  <div className="posterImage_desc">
                    {movie ? movie.overview : ""}
                  </div>
                  </div>
              </Link>
            </>
          ))
         }
        </Carousel>
        
    </div>
  )
}

export default Home