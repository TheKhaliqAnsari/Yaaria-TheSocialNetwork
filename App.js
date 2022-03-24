const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8888;
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(express.urlencoded());

// Cookie parser middleware ->
app.use(cookieParser());

//For locating static files ->
app.use(express.static('./assets'));

app.use(expressLayouts);
//extract styles and scripts from sub pages into the layout ->
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Use express routers ->
app.use('/', require('./routes')); 

// set up the ejs view engine ->
app.set('view engine', 'ejs');
app.set('views','./views');


// Starting server and listening to the port ->
app.listen(port, (err) => {
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running at: ${port}`);
});