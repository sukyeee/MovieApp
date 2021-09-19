const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema({
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

const Like = mongoose.model('Like', likeSchema);

module.exports = { Like }