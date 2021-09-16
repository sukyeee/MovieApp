// import { response } from 'express'
import React, { useEffect, useState } from 'react'
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import {Row} from 'antd';
import GridCards from '../commons/GridCard';
import Favorite from './Sections/Favorite';
import LikeDislikes from './Sections/LikeDislikes';
import Comments from './Sections/Comments';
import Axios from 'axios';
// import { response } from 'express';

function MovieDetail(props) {
    let movieId = props.match.params.movieId
    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    const [Movie, setMovie] = useState([]);
    const [Casts, setCasts] = useState([]);
    const [ToggleCasts, setToggleCasts] = useState(false);
    const [CommentLists, setCommentLists] = useState([])
    const [LoadingForMovie, setLoadingForMovie] = useState(true)
    const [LoadingForCasts, setLoadingForCasts] = useState(true)
   
    const variables = {
        postId: movieId
    }
    Axios.post('/api/comment/getComments', variables)
    .then(response => {
        console.log('CommentLists',response.data.comments)
        if (response.data.success) {

            setCommentLists(response.data.comments)
        } else {
            alert('getComments 정보를 가져오는데 실패 했습니다.')
        }
    })
   

    const toggleCastView = () => {
        setToggleCasts(!ToggleCasts)
    }
    useEffect(() => {
        // console.log(props.match)
        fetch(endpointInfo)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setMovie(response)
        })
    }, [])

    useEffect(() => {
        // console.log(props.match)
        fetch(endpointCrew)
        .then(response => response.json())
       .then(response => {
        //    console.log(response)
           setCasts(response.cast);
       })
    }, [])

    const fetchDetailInfo = (endpoint) => {
        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                console.log(result)
                setMovie(result)
                setLoadingForMovie(false)

                let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
                fetch(endpointForCasts)
                    .then(result => result.json())
                    .then(result => {
                        console.log('result' , result)
                        setCasts(result.cast)
                    })

                setLoadingForCasts(false)
            })
            .catch(error => console.error('Error:', error)
            )
    }
  
    

    return (    
        <div>
            {/* Header */}
            <div style={{width:'85%', margin:'1rem auto'}}>
            <MainImage 
             image = {`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
             title = {Movie.original_title} 
             text = {Movie.overview}
            />

            
            {/* Body */}
            {/* <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}></Favorite> */}
            <br />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
            </div>

            <MovieInfo
             movie={Movie}
            />

            {/*actor info */}
            {ToggleCasts && 
            <Row gutter={[16, 16]}>
              {Casts && Casts.map((cast, index) => (
                <React.Fragment key={index}>
                <GridCards
                show
                image = {cast.profile_path ?
                `${IMAGE_BASE_URL}w500${cast.profile_path}` : null} 
                castName = {cast.name}
                  />

                </React.Fragment>
              ))}
            </Row>
            }

            <div style={{display:'flex', justifyContent:'center' ,margin:'1rem'}}>
            <button onClick={toggleCastView}>toggle button</button>
            </div>

            <LikeDislikes movieId={movieId} userFrom={localStorage.getItem('userId')} />
         
            {/* <div style={{fontSize:'24px', fontWeight:'bold'}}>Share your opinions about {Movie.title}</div> */}
            {/* 댓글 / 답글 */}

            {/* user데이터베이스에서 userId가져오기 */}
            <Comments userFrom={localStorage.getItem('userId')} movieId={movieId} /> 
            </div>
        </div>
    )
}

export default MovieDetail
