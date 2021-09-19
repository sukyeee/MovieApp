
const { response } = require('express');
const express = require('express');
const router = express.Router();
const { Like } = require('../models/Like');

router.post('/likeNumber', (req, res) => { //front에서 post로 요청해서, post로 응답해줌. front에서 보낸 variable은 req로 받음

    //mongoDB에서   Like 숫자를 가져오기 
    Like.find({ "movieId": req.body.movieId, "commentId":req.body.commentId }) //DB안에 req.body.movieId와 같은게 있으면 ok
        .exec((err, info) => { //info는 해당 movieId가 가지는 db데이터의 개수!
            if (err) return res.status(400).send(err)
            // 그다음에   프론트에  다시   숫자 정보를 보내주기  
            res.status(200).json({ success: true, likeNumber: info.length , infomation: info})
        })    
})

router.post('/liked', (req, res) => { //front에서 post로 요청해서, post로 응답해줌. front에서 보낸 variable은 req로 받음

    
    Like.find({ "movieId": req.body.movieId, "userFrom":req.body.userFrom ,"commentId":req.body.commentId })
        .exec((err, info) => {
            if (err) return res.status(400).send(err)
  
            let result = false;
            if(info.length != 0) result = true;

            res.status(200).json({ success: true, liked: result })
        })    
})


router.post('/removeFromLike', (req, res) => {

    Like.findOneAndDelete({ "movieId": req.body.movieId, "userFrom": req.body.userFrom,"commentId":req.body.commentId  })
        .exec((err, doc) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, doc })
        })

})
router.post('/addToLike', (req, res) => {

    const like = new Like(req.body) //DB에 추가할 새로운 데이터?

    like.save((err, doc) => {
        if (err) return res.status(400).send(err)
        return res.status(200).json({ success: true })
    })

})
  
module.exports = router;
