const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dislikeSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type: String,
    },
    commentId: {
        type:String,
    }
},{ timestamps: true })

const DisLike = mongoose.model('DisLike', dislikeSchema);

module.exports = { DisLike }