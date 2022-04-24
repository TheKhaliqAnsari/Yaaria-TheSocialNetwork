const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const { route } = require('./users');


// Home controller ->
router.get('/', homeController.home);
//Users Controller ->
router.use('/users', require('./users'));

//Posts Controller ->
router.use('/posts', require('./posts'));


router.use('/comments', require('./comments'));

//adding api ->
router.use('/api', require('./api'));

//login controller ->
// router.get('/login', )

module.exports = router; 