const { User, Session } = require('../models');
const bcrypt = require('bcrypt');
const { generateAccessToken } = require('../utils/generateAccessToken');
const { getGoogleOAuthTokens } = require('../utils/getGoogleOAuthTokens');
const { getGoogleUser } = require('../utils/getGoogleUser');
const { generateRandomPassword } = require('../utils/generateRandomPassword');
const { createSessionForUser } = require('../utils/createSessionForUser');
const registerSchema = require('../validation/registerSchema');
const loginSchema = require('../validation/loginSchema');

async function register(req, res) {
    const { error } = registerSchema.validate(req.body);
    
    if (error) {
        res.status(400).json({error: error.details});
        return;
    }

    const { name, email, password } = req.body;

    try {
        const emailExists = await User.findOne({
            where: {
              email
            }
        })

        if (emailExists) {
            return res.status(409).json({ error: 'Email already exists' });
        }
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })
        return res.status(201).json({ message: 'User registered successfully', newUser });
    } catch(error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

function login(req, res) {
    const { error } = loginSchema.validate(req.body);

    if (error) {
        return res.status(400).json(error.details);
    }

    const { email, password } = req.body;

    User.findOne({ where: { email } })
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        bcrypt.compare(password, user.password)
        .then((isPasswordValid) => {
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }
            // const token = generateAccessToken(user.id, user.email);
            // return res.status(200).json({ message: 'Login successful', jwt: token, name: user.name, id: user.id });
            
            createSessionForUser(user).then((sessionToken) => {
                return res.status(200).json({ message: 'Login successful', token: sessionToken, name: user.name, id: user.id });
            });
        });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    });
}

async function googleOauthHandler(req, res) {
    const code = req.query.code;

    try {
        const {id_token, access_token} = await getGoogleOAuthTokens(code);        
        const googleUser = await getGoogleUser(id_token, access_token);
        // const token = generateAccessToken(googleUser.id, googleUser.email);
        
        let user = await User.findOne({
            where: {
                email: googleUser.email
            }
        })

        if (!user) {
            const randomPassword = await generateRandomPassword();
            const { name, email } = googleUser;

            user = await User.create({
                name,
                email,
                password: randomPassword,
            })
        }

        const sessionToken = await createSessionForUser(user);

        res.redirect(`http://localhost:3000/?token=${sessionToken}&username=${googleUser.name}`);
    } catch(error) {
        return res.redirect('http://localhost:3000/')
    }
}

async function logout(req, res) {
    const sessionToken = req.headers.authorization;

    try {
        const deletedCount = await Session.destroy({ where: { token: sessionToken } });
        if (deletedCount === 0) {
            return res.status(404).json({ success: false, message: 'Session not found.' });
          }
          return res.status(200).json({ success: true, message: 'Session removed successfully.' });
    } catch(error) {
        console.error('Error removing session:', error);
        return res.status(500).json({ success: false, message: 'Error removing session.' });
    }
}

module.exports = {
    register,
    login,
    logout,
    googleOauthHandler
}