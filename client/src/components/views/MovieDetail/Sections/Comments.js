import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {Avatar, Button, Input, Typography, } from 'antd'
import Axios from 'axios'
import SingleComment from './SingleComment'

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
                props.refreshFunc(response.data.result)
                setComment("")
              
            } else {
                alert('saveComment 에서 데이터를 가져오지 못했습니다')
            }
        })
    }

    return (
        <div>
            {console.log('props.commentLists', props.commentLists)}
                {/* { props.commentLists.map((comment, index)=> (
                    <React.Fragment>
                     <SingleComment 
                     refreshFunc={props.refreshFunc}
                     comment = {comment}
                     />
                     </React.Fragment>
           
                ))
                } */}

            <form style={{'display':'flex', 'border-radius':'5px'}} onSubmit = {onSubmit}>
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
