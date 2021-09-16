import React, { useState } from 'react'
import {Input, Button, Avatar, Comment } from 'antd'
function SingleComment() {

    const [CommentValue, setCommentValue] = useState("")
    const onChange = (e) => {
        setCommentValue(e.target.value)
    }

    // const variable = {
    //     content: CommentValue,
    //     writer: props.userFrom,
    //     postId: props.postId,
    //     responseTo:
    // }
    // const onSubmit = (e) => {
    //     e.preventDefault()
    //     Axios.post('/api/comment/saveComment', variable)
    //     .then(response => {
    //         if(response.data.success){
    //             console.log('saveComment', response.data.result)
    //             setComment("")
    //             props.refreshFunction(response.data.result)
              
    //         } else {
    //             alert('saveComment 에서 데이터를 가져오지 못했습니다')
    //         }
    //     })
    // }

    
    return (

         <div>
            <Comment
            avatar = {<Avatar />}
            />
             <form style={{'display':'flex', 'border-radius':'5px'}} onSubmit >
                <Input
                onChange ={onChange}
                value={CommentValue}
                ></Input>
                <Button  style={{'width':'20%', 'height':'52px'}}
                
                >Submit</Button>
            </form>
        </div>
    )
}

export default SingleComment
