const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8888;
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//use for session cookie ->
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');


const customMware = require('./config/middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle:'expanded', 
    prefix: '/css'
}));

app.use(express.urlencoded());

// Cookie parser middleware ->
app.use(cookieParser());

//For locating static files ->
app.use(express.static('./assets'));
// make the uploads path available to browser so we can see user avatar.
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(expressLayouts);
//extract styles and scripts from sub pages into the layout ->
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// set up the ejs view engine ->
app.set('view engine', 'ejs');
app.set('views','./views');

// mongo store is used to store session cookie in db
app.use(session({
    name: 'Yaaria',
    //TODO change the secret before to deployment in production->
    secret:'kingsman',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/yaaria_development',
        autoRemove: "disabled"
    },
    function(err){
        console.log(err || 'Connect-mongo db setup ok');
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// Use express routers ->
app.use('/', require('./routes')); 

// Starting server and listening to the port ->
app.listen(port, (err) => {
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running at: ${port}`);
});