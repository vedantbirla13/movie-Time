import React , { useEffect , useState } from "react";
import { useParams } from "react-router-dom"
import Skeleton , {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import axios from "axios"
import "./movieDetails.css";
import { FaStar , FaExternalLinkAlt } from "react-icons/fa"


const MovieDetails = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        } , 1500)
    }, [])

    const [currentMovie, setCurrentMovie] = useState();
    const { id } = useParams();

    const fetchData = async() => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        setCurrentMovie(data);
    }


    useEffect(() => {
        fetchData();
        window.scroll(0,0);
    }, [])

    return (
        <>
        {
            isLoading ? 
            <div className='movieDet'>
               <SkeletonTheme color="#313131" highlightColor="#525252">
                <Skeleton width="100%" height={300} duration={2} count={3} />
            </SkeletonTheme>
            </div>
            :
                <div className="movie">
                    <div className="movie_intro">
                        <img className="movie_backdrop" src={`https://image.tmdb.org/t/p/original${currentMovie ? currentMovie.backdrop_path : ""}`} alt="" />
                    </div>

                    <div className="movie_detail">
                        <div className="movie_detailLeft">
                            <div className="movie_posterBox">
                                <img  className="movie_poster" src={`https://image.tmdb.org/t/p/original${currentMovie ? currentMovie.poster_path : ""}`} alt="" />
                            </div>
                        </div>

                        <div className="movie_detailRight">
                            <div className="movie_detailRightTop">
                                <div className="movie_name">{currentMovie ? currentMovie.original_title : ""}</div>
                                <div className="movie_tag">{currentMovie ? currentMovie.tagline : ""}</div>
                                <div className="movie_rating">
                                    {currentMovie ? currentMovie.vote_average : ""} 
                                    <span className="icon">{<FaStar/>}</span>
                                    <span className="movie_voteCount">{currentMovie ? "Release date: " + currentMovie.release_date : ""}</span>
                                </div>
                                <div className="movie_genres">
                                    {
                                        currentMovie && currentMovie.genres
                                        ?
                                        currentMovie.genres.map(genre => (
                                            <>
                                                <span className="movie_genre" id={genre.id}>{genre.name}</span>
                                            </>
                                        ))
                                        :
                                        ""
                                    }
                                </div>
                            </div>

                            <div className="movie_detailRightBottom">
                                <div className="overviewText">Synopsis</div>
                                <div className="overview_para">{currentMovie ? currentMovie.overview : ""}</div>
                            </div>
                        </div>
                    </div>

                    <div className="movie_links">
                    <div className="links_heading">Useful Links</div>
                        <div className="useful_links">
                            {
                                currentMovie && currentMovie.homepage && 
                                <a href={currentMovie.homepage} target="_blank" style={{ textDecoration:"none" }}>
                                <p> <span className="movie_homeButton movie_Button"><FaExternalLinkAlt/>Homepage</span></p> 
                                </a>
                            }

                            {
                                currentMovie && currentMovie.imdb_id &&
                                <a href={"https://www.imdb.com/title/" + currentMovie.imdb_id} target="_blank" style={{ textDecoration:"none" }}>
                                <p> <span className="movie_homeButton movie_Button"><FaExternalLinkAlt/>IMDB</span></p> 
                            </a>
                            }
                        </div>

                        <div className="movie_heading">Production Companies</div>
                        <div className="movie_production">
                            {
                                currentMovie && currentMovie.production_companies && currentMovie.production_companies.map(company => (
                                    <>
                                        {
                                            company.logo_path
                                            && 
                                            <span className="production_companyImage">
                                                <img className="movie_prodcutionCompany" src={"https://image.tmdb.org/t/p/original" + company.logo_path } alt="" />
                                                <span className="production_name">{company.name}</span>
                                            </span>
                                        }
                                    </>
                                ))
                            }
                        </div>
                    </div>
                </div>
        }
        </>
        )
}
export default MovieDetails