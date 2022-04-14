const req = require('express/lib/request');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


// Auth using passport ->

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
    function(req, email, password, done){
        // find user and establish identity ->
        User.findOne({email: email}, (err, user) =>{
            if(err){
                req.flash('error', err);
                return done(err);
            }
            if(!user || user.password != password){
                req.flash('error','Invalid Username/Password');
                return done(null, false);
            }
            return done(null, user);
        });
    }
));


// serializing the user to decide which key is to kept in cookie ->

passport.serializeUser((user, done) => {
    done(null, user.id);
});


//deserializing the user from the key in the cookie ->
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) =>{
        if(err){
            console.log('Error in finding user --> passport');
            return done(err);
        }
        return done(null, user);
    });
});

// Check if user is authenticated ->
passport.checkAuthentication = (req, res , next) => {
    // if user is sign in, then pass on the req to next auth function.
    if(req.isAuthenticated()){
        return next();
    };
    //if user is not sign in ->
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = (req, res, next) => {
    if(req.isAuthenticated()){
    // req.user contan the current signed in user from the session cookie and we are just sengin to the locals for the views
        res.locals.user = req.user;

    }
    next();
}

module.exports = passport;