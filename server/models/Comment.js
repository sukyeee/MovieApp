const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String,
    },
    text: {
        type: String,
    }
},{ timestamps: true })

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }