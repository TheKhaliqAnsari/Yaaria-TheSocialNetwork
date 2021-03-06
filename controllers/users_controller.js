const { use } = require('passport/lib');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');


module.exports.profile = (req, res) => {
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile',{
            title:'User Profile',
            profile_user: user
        });
    });
    
}

module.exports.update = async (req, res) =>{
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body, function(err, user){
    //         req.flash('success', 'Updated!');
    //         return res.redirect('back');
    //     });
    // }else{
    //     req.flash('error', 'Unauthorized!');
    //     return res.status(401).send('Unautorized');
    // }
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err) {
                    console.log('****Multer Error : ', err);
                }
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    //this code is for removing image if user updated new image but it giving me some error so i will wok on it letter

                    // if(user.avatar){
                    //     fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    // }


                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        }catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }

    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unautorized');
    }
}


// Render the sign up page ->

module.exports.signUp = (req, res) => {

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
     }

    return res.render('user_sign_up', {
        title: "Yaaria - Sign up"
    })
}
// Render the sign in page ->
module.exports.signIn = (req, res) => {

    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: "Yaaria - Sign In"
    })
}

// get the sign up data ->
module.exports.create = (req, res) => {
    if(req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
      }
      User.findOne({email : req.body.email}, (err, user) => {
        if(err){req.flash('error', err); return}

          if(!user){
              User.create(req.body, (err, user) => {
                if(err){req.flash('error', err); return}
                  return res.redirect('/users/sign-in');
              })
          }else{
            req.flash('success', 'You have signed up, login to continue!');
              return res.redirect('back');
          }
      });
    }

// sign in and create a session for users
module.exports.createSession = (req, res) => {
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = (req, res) => {
    req.logout();
    req.flash('success','You have logged out!!');
    return res.redirect('/');
}
