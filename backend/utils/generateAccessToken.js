const jwt = require("jsonwebtoken");
require('dotenv').config();
const SECRET = process.env.SECRET;

function generateAccessToken(id, email) {
    const payload = {
        id,
        email
    };
    return jwt.sign(payload, SECRET, { expiresIn: "36000s" });
}

module.exports = { generateAccessToken }