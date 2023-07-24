const axios = require('axios');
const qs = require('qs');

async function getGoogleOAuthTokens(code) {
    const url = 'https://oauth2.googleapis.com/token';

    const values = {
        code,
        client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
        client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT,
        grant_type: 'authorization_code'
    }
    console.log('values', values);
    try {
        const res = await axios.post(url, qs.stringify(values), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        return res.data;
    } catch(error) {
        console.error('Failed to fetch Google Oauth Tokens', error);
        throw new Error(error.message);
    }
}

module.exports = { getGoogleOAuthTokens }