const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


// Auth using passport ->

passport.use(new LocalStrategy({
    usernameField: email
},
    function(email, password, done){
        // find user and establish identity ->
        User.findOne({email: email}, (err, user) =>{
            if(err){
                console.log('error in finding user --> passport');
                return done(err);
            }
            if(!user || user.password != password){
                console.log('Invalid Username/Password');
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

module.exports = passport;