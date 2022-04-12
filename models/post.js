const mongoose = require('mongoose');

const postSchema = new mongoose.postSchema({
    content:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
model.exports = Post;