import React, { useEffect , useState } from 'react'
import Skeleton , {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import "./card.css"
import { Link } from "react-router-dom"
import { FaStar } from "react-icons/fa"

const Card = ({ movie }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        } , 1500)
    }, [])
    
  return (  
      
      
    <div>
        {
            isLoading ? 
            <div className='cards'>
               <SkeletonTheme color="#313131" highlightColor="#525252">
                <Skeleton width="100%" height={300} duration={2} count={3} />
            </SkeletonTheme>
            </div>
            :
            <Link to={`/movie/${movie.id}`}>
                <div className="cards">
                    <img className='cards_img' src={`https://image.tmdb.org/t/p/original${movie && movie.poster_path } ` } alt="" />
                    <div className="cards_overlay">
                        <div className="cards_title">{ movie ? movie.original_title : "" }</div>
                        <div className="cards_runtime">
                            {movie ? movie.release_date : ""}
                            <span className="icon">{<FaStar/>}</span>
                        </div>
                        <div className="cards_desc">{ movie ? movie.overview.slice(0,118)+"..." : "" }</div>
                    </div>
                </div>
            </Link>

        }
    </div>
  )
}

export default Card