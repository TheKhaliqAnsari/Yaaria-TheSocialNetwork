const express = require('express');
const app = express();
const port = 8888;
const path = require('path');


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