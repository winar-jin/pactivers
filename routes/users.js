const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        password: req.body.password
    });
    User.getUserByUsername(req.body.name, (err, user) => {
        if (user) {
            res.json({
                success: false,
                msg: 'User exist!'
            });
        } else {
            User.addUser(newUser, (err, user, number) => {
                if (err) {
                    res.json({ success: false, msg: 'Failed to register a user!' });
                } else {
                    res.json({ success: true, msg: 'User register!' });
                }
            });
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const name = req.body.name;
    const password = req.body.password;
    User.getUserByUsername(name, (err, user) => {
        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 // 1 Week
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        password: user.password
                    }
                });
            } else {
                res.json({ success: false, msg: 'Wrong Password!' });
            }
        });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

module.exports = router;