
const express = require('express');
const router = express.Router();
const { Comment } = require('../models/Comment');

router.post('/commentList', (req, res) => {

    const comment = new Comment(req.body)

    comment.save((err, doc) => { //save:데이터를 데이터베이스에 저장
        if (err) return res.status(400).send(err)
        return res.status(200).json({ success: true, input: doc })
    })
})
module.exports = router;