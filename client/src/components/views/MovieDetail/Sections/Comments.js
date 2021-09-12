import TextArea from 'antd/lib/input/TextArea'
import Axios from 'axios'
// import { response } from 'express'
import React, { useState } from 'react'
import {Button} from 'antd'
import { FaFileExcel } from 'react-icons/fa'

function Comments(props) {

    const [CommentList, setCommentList] = useState([])
    const [Input, setInput] = useState(null)

    const variable= {
       userFrom : props.userFrom,
       movieId :  props.movieId,
       Input //댓글 내용
    }

    const onChange = (e) => {
        setInput(e.target.value)
        console.log(Input)
    }
    const onClickSubmit = () => { //댓글 submit => DB에 댓글 commentList 저장
        Axios.post('/api/comment/commentList', variable)
        .then(response => {
            if(response.data.success){
                console.log('commentList', response.data)
            }else{
                alert('comment 내용을 저장하는 데 실패했습니다')
            }
        })
    }

    return (
        <div>
            <div class="comment-list" style={{display:'flex', height:'200px'}}>
            {/* username, comment,  */}
            </div>

            <form style={{display:"flex"} } onSubmit>
            <TextArea
            style={{width:'100%', borderRadius:'5px'}}
            onChange={onChange}
            />
            <Button onClick={onClickSubmit} style={{width:'300px', height:'50px'}}> Submit </Button>
            </form>

        </div>
    )
}

export default Comments
