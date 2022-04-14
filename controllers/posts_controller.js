const Post = require('../models/post');
const Comment = require('../models/comment');

// controller for creating the post ->
module.exports.create = async function(req, res){

    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        req.flash('success', 'Post published!');
        return res.redirect('back');
    } catch (error) {
        req.flash('error', error);
        return res.redirect('back');
    }

    await Post.create({
        content: req.body.content,
        user: req.user._id
    });
    return res.redirect('back');
}

//controller for deleting the post->
module.exports.destroy = async function(req, res){

    try {
        let post =  await Post.findById(req.params.id);

    if(post.user == req.user.id){
        post.remove();
        await Comment.deleteMany({post: req.params.id});

        req.flash('success', 'Post and associated comments deleted!');

        return res.redirect('back');
    }else{
        req.flash('error', 'You can not delete this post');
        return res.redirect('back');
    }
    } catch (error) {
        req.flash('error', error);
        return res.redirect('back');
    }

    

}