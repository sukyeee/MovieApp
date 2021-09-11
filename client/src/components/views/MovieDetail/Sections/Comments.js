import Axios from 'axios'
import { response } from 'express'
import React from 'react'

function Comments(props) {

    const variable= {
       userFrom : props.userFrom,
       movieId :  props.movieId
    }

    Axios.post('api/Comments/comment', variable)
    .then(response => {


    })

    return (
        <div>
            
        </div>
    )
}

export default Comments
