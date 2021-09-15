const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");
const { auth } = require("../middleware/auth");

//=================================
//             Subscribe
//=================================

router.post("/saveComment", (req, res) => {

    const comment = new Comment(req.body)
    comment.save( (err, doc) => {
     
        if(err) return res.json({ success: false, err})
     
        Comment.find({'_id': doc._id})
        .populate('writer')
        .exec( (err, result) => {
            if(err) return res.status(400).send(err)
             res.status(200).json({success: true, result})

        })

       
    })
    
})

router.post("/getComments", (req, res) => {

  
});
// myFirstDatabase.comments.remove({"movieId":"848278"})

module.exports = router;