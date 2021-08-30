const { request } = require('express');
const express = require('express');
const { Favorite } = require('../models/Favorite');
const router = express.Router();

//req = request, res = response
router.post('/favoriteNumber', (req, res) => {

    //mongoDB에서 favorite숫자를 가져오기  
    Favorite.find({"movieId":req.body.movieId})
    .exec((err, info)=> {
        if(err) return res.status(400).send(err)
        
        //200=성공
    //그 다음에 프론트에 다시 숫자 정보를 보내주기
        res.status(200).json({success:true, favoriteNumber: info.length})
    })
    //module의 movieId와 View의 movieId 와 같은정보를 찾아달라
  
})

router.post('/favorited', (req, res) => {

    //내가 이  영화를 Favorite 리스트에 넣었는지 정보를 DB에서 가져오기
    Favorite.find({"movieId":req.body.movieId, "userFrom": req.body.userFrom})
    .exec((err, info)=> {
        if(err) return res.status(400).send(err)
        let result = false;
        if(info.length != 0) result = true;

         res.status(200).json({success:true, favorited:result})
    })
    
})

router.post('/removeToFavorite', (req, res) => {

  Favorite.findOneAndDelete({movieId: req.body.movieId, userFrom:req.body.userFrom})
  .exec((err, doc) => {
      if(err)return  res.status(400).send(err)
      return res.status(200).json({success:true, doc })
  })
    
})

router.post('/addToFavorite', (req, res) => {

    const Favorite = new Favorite(req.body)

    Favorite.save((err, doc)=> {
        if(err) return res.status(400).send(err)
        return res.status(200).json({success:true})
    })
    
})


module.exports = router;    