const express = require('express');
const router = express.Router();
const Users = require('../modules/users');
const passport = require('passport');
const bcrypt = require('bcryptjs');

/* GET home page. */
router.get('/login', function (req, res, next) {
    res.render('login', {title: 'Welcome Marta Online'});
});

router.post('/login', function (req, res, next) {
    res.render('login', {title: 'Welcome Marta Online'});
});


router.get('/register', function (req, res, next) {
    res.render('register', {title: 'Welcome Marta Online'});
});

router.post('/register', function (req, res) {

    //Collect user account details
    const username = req.body.username;
    const email = req.body.userEmail;
    const password = req.body.userpass;
});

module.exports = router;
