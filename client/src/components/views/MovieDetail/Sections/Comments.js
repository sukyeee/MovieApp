import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {Button, Input, Typography, } from 'antd'
import Axios from 'axios'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'
// import { response } from 'express'
function Comments(props) {

    // const user = useSelector(state => state.user)
    const [Comment, setComment] = useState("")
    // props.commentList = props.commentLists.concat(Comment)

    const onChange = (e) => {
        setComment(e.target.value)
    }

    const variable = {
        content: Comment,
        writer: props.userFrom,
        postId: props.postId
    }

    const onSubmit = (e) => {
        e.preventDefault()
        Axios.post('/api/comment/saveComment', variable)
        .then(response => {
            if(response.data.success){
                console.log('saveComment', response.data.result)
                props.refreshFunction(response.data.result)
                setComment("")
              
            } else {
                alert('saveComment 에서 데이터를 가져오지 못했습니다')
            }
        })
    }

    return (
        <div>
            {console.log('comments-props.commentLists', props.CommentLists)}
                { props.CommentLists && props.CommentLists.map((comment, index)=> (
                     (!comment.responseTo &&
                    <React.Fragment>                        
                     <SingleComment refreshFunction={props.refreshFunction} comment = {comment} postId = {props.postId}  />
                     <ReplyComment CommentLists={props.CommentLists} parentCommentId={comment._id} postId={props.postId} refreshFunction={props.refreshFunction} />
                     </React.Fragment>

                     )
                ))
                }

            <form style={{'display':'flex', 'borderRadius':'5px'}} onSubmit = {onSubmit}>
                <Input
                onChange={onChange}
                value={Comment}
                ></Input>
                <Button onClick={onSubmit} style={{'width':'20%', 'height':'52px'}}
                
                >Submit</Button>
            </form>
        </div>
    )
}

export default Comments