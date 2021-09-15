import TextArea from 'antd/lib/input/TextArea'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {Button} from 'antd'
import Axios from 'axios'

// import { response } from 'express'
function Comments(props) {

    // const user = useSelector(state => state.user)
    const [Comment, setComment] = useState("")
    
    const onChange = (e) => {
        setComment(e.target.value)
    }

    const variable = {
        content: Comment,
        writer: props.userFrom,
        postId: props.postId
    }
    const onSubmit = (e) => {
        Axios.post('/api/comment/saveComment', variable)
        .then(response => {
            if(response.data.success){
                console.log('saveComment', response.data.result)
                setComment("")
              
            } else {
                alert('saveComment 에서 데이터를 가져오지 못했습니다')
            }
        })
    }

    return (
        <div>
            <form style={{'display':'flex', 'border-radius':'5px'}} onSubmit = {onSubmit}>
                <TextArea
                onChange={onChange}
                value={Comment}
                ></TextArea>
                <Button onClick={onSubmit} style={{'width':'20%', 'height':'52px'}}
                
                >Submit</Button>
            </form>
        </div>
    )
}

export default Comments
