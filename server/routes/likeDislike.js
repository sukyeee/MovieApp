
const { response } = require('express');
const express = require('express');
const router = express.Router();
const { LikeDislike } = require('../models/LikeDislike');

router.post('/like', (req, res) => { //front에서 post로 요청해서, post로 응답해줌. front에서 보낸 variable은 req로 받음

    //mongoDB에서   LikeDislike 숫자를 가져오기 
    LikeDislike.find({ "movieId": req.body.movieId })
        .exec((err, info) => {
            if (err) return res.status(400).send(err)
            // 그다음에   프론트에  다시   숫자 정보를 보내주기  
            res.status(200).json({ success: true, likeNumber: info.length })
        })    
})

router.post('/liked', (req, res) => { //front에서 post로 요청해서, post로 응답해줌. front에서 보낸 variable은 req로 받음

    //mongoDB에서   LikeDislike 숫자를 가져오기 
    LikeDislike.find({ "movieId": req.body.movieId, "userFrom":req.body.userFrom })
        .exec((err, info) => {
            if (err) return res.status(400).send(err)
  
            let result = false;
            if(info.length != 0) result = true;

            res.status(200).json({ success: true, liked: result })
        })    
})


router.post('/removeFromLike', (req, res) => {

    LikeDislike.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, doc })
        })

})
router.post('/addToLike', (req, res) => {

    const likeDislike = new LikeDislike(req.body)

    likeDislike.save((err, doc) => {
        if (err) return res.status(400).send(err)
        return res.status(200).json({ success: true })
    })

})

module.exports = router;
