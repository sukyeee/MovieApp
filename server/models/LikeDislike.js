const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeDislikeSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String,
    },
    movieTitle: {
        type: String
    },
    moviePost : {
        type: String
    },
    movieRunTime: {
        type: String
    }
},{ timestamps: true })

const LikeDislike = mongoose.model('LikeDislike', likeDislikeSchema);

module.exports = { LikeDislike }