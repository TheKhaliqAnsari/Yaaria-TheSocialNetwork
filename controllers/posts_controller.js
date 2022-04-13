const Post = require('../models/post');
const Comment = require('../models/comment');

// controller for creating the post ->
module.exports.create = (req, res)=>{
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err){
            console.log('error in creating a post'); return;
        }
        return res.redirect('back');
    });
}

//controller for deleting the post->
module.exports.destroy = function(req, res){
    Post.findById(req.params.id, (err, post) => {
        if(post.user == req.user.id){
            post.remove();
            Comment.deleteMany({post: req.params.id}, function(err){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
}