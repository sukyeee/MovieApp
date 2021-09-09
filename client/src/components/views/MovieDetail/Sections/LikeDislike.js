import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { IoMdThumbsUp, IoMdThumbsDown } from "react-icons/io";

function LikeDislike(props) {

    const userFrom = props.userFrom
    const movieId = props.movieId
    let variables = {
        userFrom, //현재 유저정보와 어떤 movie를 좋아요 했는지 정보를 같이 서버에 보내줌
        movieId
    }

    // const [like, setLike] = useState({
    //     num:0,
    //     state: false,
    //     color: 'black'
    // });
    // const [dislike, setDislike] = useState({num:0, state: false, color: 'black'});
    
    const [like, setLike] = useState(0);
    const [liked, setLiked] = useState(false)

    useEffect(() => {
        
        
         Axios.post('/api/likeDislike/like', variables) //DB서버에 요청 (임의로 정한 위치)
        .then(response => { //요청받은 결과값: response
            console.log('like', response.data)
            if(response.data.success){
       
                setLike(response.data.likeNumber)
            }else alert('like 정보 가져오는데 실패함')
            
        })

        Axios.post('/api/likeDislike/liked', variables) //DB서버에 요청 (임의로 정한 위치)
        .then(response => { //요청받은 결과값: response
            console.log('liked',response.data)
        
            if(response.data.success){
                setLiked(response.data.liked)
            }else alert('liked! 정보 가져오는데 실패함')
            
        })
        
        // Axios.post('/api/likeDislike/disLike', variables)
        // .then(response => {
            
        // })
    
    }, [])

    const onClicklikeButton = () => {
        if (liked) {
            Axios.post('/api/likeDislike/removeFromLike', variables)
                .then(response => {
                    if (response.data.success) {
                        setLike(like - 1)
                        setLiked(!liked)
                    } else {
                        alert('Like 리스트에서 지우는 걸 실패했습니다.')
                    }
                })


        } else {
            Axios.post('/api/likeDislike/addToLike', variables)
                .then(response => {
                    if (response.data.success) {
                        setLike(like + 1)
                        setLiked(!liked)

                    } else {
                        alert('Like 리스트에서 추가하는 걸 실패했습니다.')
                    }
                })
        }
    }
    
    return (
        <div>
               <div style={{display:'flex', justifyContent:'center', margin:'1rem'}}>
                <button onClick={onClicklikeButton} style={{background:'none', border:'none', color:`${like.color}`}}> {liked? <IoMdThumbsUp color="blue"/> :<IoMdThumbsUp color="black"  />    }</button>  {like}
                {/* <button onClick={onClickBadButton} style={{background:'none', border:'none', marginLeft:'0.5rem', color:`${dislike.color}`}}> <IoMdThumbsDown /></button> {dislike.num} */}
               </div>
        </div>
    )
}

export default LikeDislike

