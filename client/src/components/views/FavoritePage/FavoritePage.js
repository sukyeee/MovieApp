import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import './favorite.css'
import {Popover} from 'antd'
import { IMAGE_BASE_URL } from '../../Config'

function FavoritePage() {

   
    const [Favorites, setFavorites] = useState([])

    useEffect(() => {
        fetchFavoredMovie()
    }, [])

    const fetchFavoredMovie = () => {
        Axios.post('/api/favorite/getFavoredMovie', { userFrom: localStorage.getItem('userId') })
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    setFavorites(response.data.favorites)
                } else {
                    alert('영화 정보를 가져오는데 실패 했습니다.')
                }
            })
    }


    const onClickDelete = (movieId, userFrom) => {

        const variables = {
            movieId,
            userFrom
        }

        Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if (response.data.success) {
                    fetchFavoredMovie()
                } else {
                    alert("리스트에서 지우는데 실패했습니다.")
                }
            })


    }



    return (
        <div style={{width:'85%', margin: '3rem auto'}}>
            <h2> Favorite Movies</h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie Runtime</th>
                        <th>Remove from favorites</th>
                    </tr>
                </thead>
                <tbody>
                {Favorites.map((favorite, index) => (
                    <tr key={index}>
                        <td><Popover content= {<img src= {`${IMAGE_BASE_URL}w300${favorite.moviePost}`} />} title={`${favorite.movieTitle}`}>{favorite.movieTitle}</Popover></td>
                        <td>{favorite.movieRunTime}</td>
                        <td><button onClick= { () => onClickDelete(favorite.movieId, favorite.userFrom)} > REMOVE</button></td>
                    </tr>
                ))}
                </tbody>
            </table>    
        </div>
    )
}

export default FavoritePage
