import React, { useState } from 'react'
import {Avatar, Input, Comment, Button} from 'antd'
import Axios from 'axios'


function SingleComment(props) {

    const [CommentValue, setCommentValue] = useState("")
    const [openReply, setopenReply] = useState(false)
    const onChange = (e) => {
       setCommentValue(e.target.value)
    }
    const openReplyButton = () => {
        setopenReply(!openReply)
    }
    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            writer: props.userFrom,
            postId: props.postId,
            responseTo: props.comment._id,
            content: CommentValue
        }


        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setCommentValue("")
                    setopenReply(!openReply)
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save Comment')
                }
            })
    }
    return (
       
        <div>
        <Comment
            avatar= {<Avatar src alt/> }
            action= {<Button onClick={openReplyButton}>Reply </Button>}
            refreshFunc={props.refreshFunc}
            comment = {props.comment}
        />     
            { openReply &&
             <form style={{'display':'flex', 'border-radius':'5px'}} onSubmit={onsubmit} >
                <Input
                onChange = {onChange}
                value = {CommentValue}
                ></Input>
                <Button onsubmit={onsubmit} onClick style={{'width':'20%', 'height':'52px'}}
       
                >Submit</Button>
            </form>
            }
        </div>
    )
}

export default SingleComment
