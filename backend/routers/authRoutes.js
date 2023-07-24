const express = require('express');
const userRt = express.Router();
const authCtrl = require('../controllers').authCtrl;

userRt.get('/api/sessions/oauth/google', authCtrl.googleOauthHandler)
userRt.post('/register', authCtrl.register);
userRt.post('/login', authCtrl.login);

module.exports = userRt;