import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
import MainImage from './Sections/MainImage';
import GridCards from '../commons/GridCard';
import {Row} from 'antd';
import { Menu, Input } from 'antd';
const { Search } = Input;

// import { response } from 'express';


function LandingPage() {

  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [Currentpage, setCurrentpage] = useState(0);
  const [SearchValue, setSearchValue] = useState(null)

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint)
  }, []);

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
    .then(response => response.json())
    .then(response => {
      console.log(response.results)
      setCurrentpage([response.page])
      setMovies([...Movies,...response.results])
      setMainMovieImage(response.results[0])
      
    })
  }

  const loadmoreItems = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${Currentpage+1}`;
    fetchMovies(endpoint);
  }

  const onSearch = value => {
    console.log(value)
    setSearchValue(value)
    const endpoint = `${API_URL}search/movie?api_key=${API_KEY}&query=${value}`;
    fetch(endpoint)
    .then(response => response.json())
    .then(response => {
      console.log('searchpage' ,[response.results][0])
      setMovies([response.results][0])        
    })
  }


    return (
      
      <div style={{width:'100%', margin:'0'}}>
          <Search placeholder="input search text"  onSearch={onSearch} style={{ 'width': '200px' }} />
          { /* main image */}
          {MainMovieImage &&   <MainImage 
          image = {`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
          title = {MainMovieImage.original_title}
          text = {MainMovieImage.overview}

           /> }

          <div style={{ width: '85%', margin: '1rem auto'}}>
              <h2>Movies by latest</h2>
              <hr />
              {/* movie Grid Cards */ }
              <Row gutter={[16, 16]}>

              {Movies && Movies.map((movie, index) => (
                <React.Fragment key={index}>
                <GridCards
                landingPage
                image = {movie.poster_path ?
                `${IMAGE_BASE_URL}w500${movie.poster_path}` : null} 
                movieId = {movie.id}
                movieName = {movie.original_title}
                  />

                </React.Fragment>
              ))}

            </Row>
          </div>

        <div style={{ display: 'flex', justifyContent: 'center'}}>
            <button onClick={SearchValue == null ? loadmoreItems : "" } > Load More </button>
        </div>


      </div>
    )
}

export default LandingPage
