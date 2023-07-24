const { Session } = require('../models');
const bcrypt = require('bcrypt');

async function generateSessionToken() {
    const saltRounds = 10;
    const sessionToken = await bcrypt.hash(Math.random().toString(), saltRounds);
    return sessionToken;
  }

async function createSessionForUser(user) {
    const sessionToken = await generateSessionToken();
    
    const session = await Session.create({
        user_id: user.id,
        token: sessionToken 
    })
    return sessionToken;
}

module.exports = { createSessionForUser }