import React from 'react'
import { Link } from "react-router-dom"
import "./header.css"

const Header = () => {
  return (
    <div className='header'>
        <div className="headerLeft">
            <Link to="/"><span>Movie Time</span></Link>
            <Link to="/movies/popular">Popular</Link>
            <Link to="/movies/top_rated">Top Rated</Link>
            <Link to="/movies/upcoming">Upcoming</Link>
        </div>
    </div>
  )
}

export default Header