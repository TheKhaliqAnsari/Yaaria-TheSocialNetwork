const Post = require('../models/post');

module.exports.home = (req, res) => {
    
    // Post.find({}, function(err, posts){
    //     return res.render('home',{
    //         title:"Yaaria | Home",
    //         posts: posts
    //     });
    // });

// Populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path: 'user'
        }
    })
    .exec(function(err, posts){
        return res.render('home',{
            title:"Yaaria | Home",
            posts: posts
        });
    });

}
