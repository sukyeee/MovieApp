import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { IoMdThumbsUp, IoMdThumbsDown } from "react-icons/io";
import { Icon, Tooltip } from 'antd';

function LikeDislike(props) {

    
    const userFrom = props.userFrom
    const commentId = props.commentId
    const postId = props.postId

    let variables = {
        userFrom, //현재 유저정보와 어떤 movie를 좋아요 했는지 정보를 같이 서버에 보내줌
        commentId,
        postId
    }

    const [likeNumber, setLikeNumber] = useState(0)
    const [liked, setLiked] = useState(false)
    const [dislikeNumber, setDisLikeNumber] = useState(0)
    const [disliked, setDisLiked] = useState(false)
    

    useEffect(() => {
        
         Axios.post('/api/likeDislike/likeNumber', variables) //DB서버에 요청 (임의로 정한 위치)
        .then(response => { //요청받은 결과값: response
            console.log('likeNumber', response.data)
            if(response.data.success){
                setLikeNumber(response.data.likeNumber)
                // console.log(response.data.info)
            }else alert('likeNumber 정보 가져오는데 실패함')
            
        })

        Axios.post('/api/likeDislike/liked', variables) //DB서버에 요청 (임의로 정한 위치)
        .then(response => { //요청받은 결과값: response
            // console.log('liked',response.data)
        
            if(response.data.success){
                setLiked(response.data.liked)
            }else alert('liked! 정보 가져오는데 실패함')
            
        })
        
        Axios.post('/api/likeDislike/dislikeNumber', variables) //DB서버에 요청 (임의로 정한 위치)
        .then(response => { //요청받은 결과값: response
            if(response.data.success){
                setDisLikeNumber(response.data.dislikeNumber)
                // console.log(response.data.info)
            }else alert('dislikeNumber 정보 가져오는데 실패함')
            
        })

        Axios.post('/api/likeDislike/disliked', variables) //DB서버에 요청 (임의로 정한 위치)
        .then(response => { //요청받은 결과값: response
        
            if(response.data.success){
                setDisLiked(response.data.disliked)
            }else alert('liked! 정보 가져오는데 실패함')
            
        })
    
    }, [])

    const onClicklikeButton = () => {
        if (liked) {
            Axios.post('/api/likeDislike/removeFromLike', variables)
                .then(response => {
                    if (response.data.success) {
                        setLikeNumber(likeNumber - 1)
                        setLiked(!liked)
                    } else {
                        alert('Like 리스트에서 지우는 걸 실패했습니다.')
                    }
                })


        } else {
            Axios.post('/api/likeDislike/addToLike', variables)
                .then(response => {
                    if (response.data.success) {
                        if(disliked){
                            Axios.post('/api/likeDislike/removeFromdisLike', variables)
                            .then(response => {
                                if (response.data.success) {
                                    setDisLikeNumber(dislikeNumber - 1)
                                    setDisLiked(!disliked)
                                } else {
                                    alert('Like 리스트에서 지우는 걸 실패했습니다.')
                                }
                            })
                        }
                        setLikeNumber(likeNumber + 1)
                        setLiked(!liked)

                    } else {
                        alert('Like 리스트에서 추가하는 걸 실패했습니다.')
                    }
                })
        }
    }
    const onClickdislikeButton = () => {
        if (disliked) {
            Axios.post('/api/likeDislike/removeFromdisLike', variables)
                .then(response => {
                    if (response.data.success) {
                        setDisLikeNumber(dislikeNumber - 1)
                        setDisLiked(!disliked)
                    } else {
                        alert('Like 리스트에서 지우는 걸 실패했습니다.')
                    }
                })


        } else {
            Axios.post('/api/likeDislike/addTodisLike', variables)
                .then(response => {
                    if (response.data.success) {
                        if(liked){
                            Axios.post('/api/likeDislike/removeFromLike', variables)
                            .then(response => {
                                if (response.data.success) {
                                    setLikeNumber(likeNumber - 1)
                                    setLiked(!liked)
                                } else {
                                    alert('Like 리스트에서 지우는 걸 실패했습니다.')
                                }
                            })
                        }
                        setDisLikeNumber(dislikeNumber + 1)
                        setDisLiked(!disliked)

                    } else {
                        alert('Like 리스트에서 추가하는 걸 실패했습니다.')
                    }
                })
        }
    }
    return (
        <div>
               {/* <div style={{display:'flex', justifyContent:'center', margin:'1rem'}}>
                <button onClick={onClicklikeButton} style={{background:'none', border:'none', color:`${likeNumber.color}`}}> {liked? <IoMdThumbsUp color="blue"/> :<IoMdThumbsUp color="black"  />    }</button>  {likeNumber} */}
                {/* <button onClick={onClickBadButton} style={{background:'none', border:'none', marginLeft:'0.5rem', color:`${dislikeNumber.color}`}}> <IoMdThumbsDown /></button> {dislikeNumber.num} */}
             
                <span style={{'display':'flex', 'justifyContent':'center'}} key="comment-basic-like">

                <Tooltip title="Like">
                <Icon type="like" theme={liked? "filled" : "outlined"} onClick={onClicklikeButton} ></Icon>      
                &nbsp; {likeNumber} &nbsp;
                </Tooltip>
                <Tooltip title="DisLike">
                <Icon type="dislike" theme={disliked ? "filled" : "outlined"} onClick={onClickdislikeButton} ></Icon>
                             
                </Tooltip>
                &nbsp;{dislikeNumber}&nbsp;&nbsp;&nbsp;
                </span> 
              
               {/* </div> */}
        </div>
    )
}

export default LikeDislike

