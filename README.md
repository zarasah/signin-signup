# Simple Sign-In, Sign-Up, and Google Sign-Up Application

## Description

This is a web application that allows users to sign in, sign up, and sign up using their Google account. The application is built using React for the front-end, Node.js for the server-side, and MySQL as the database.

## Features

* User registration: Users can create a new account by providing their email and password.
* User login: Existing users can sign in using their registered email and password.
* Google sign-up: Users can sign up using their Google account.
* User information: After signing in, users are redirected to their user page, where they can see their account information.

# Getting Started

* Clone the repository:
```
https://github.com/zarasah/signin-signup.git
```
* Install dependencies for both the server and client:
```
cd fronend
npm install

cd ../backend
npm install
```

* Create a MySQL database for the application.
* Configure the database connection in the backend/config/config.js file.
* Obtain your Google OAuth2 credentials (client ID, client secret, and redirect URL)
* Create .env file in the backend directory to store your sensitive environment variables.
* Add the following environment variables to the .env file:
```
GOOGLE_OAUTH_CLIENT_ID = YOUR_GOOGLE_CLIENT_ID
GOOGLE_OAUTH_CLIENT_SECRET = YOUR_GOOGLE_CLIENT_SECRET
GOOGLE_OAUTH_REDIRECT = 'http://localhost:4001/api/sessions/oauth/google'
```
* Start the Servers:
```
npm start
```

* Create .env.local file in the frontend directory.
* Add the following environment variables to the .env.local file:
```
REACT_APP_GOOGLE_OAUTH_CLIENT_ID=YOUR_GOOGLE_OAUTH_CLIENT_ID
REACT_APP_GOOGLE_OAUTH_ENDPOINT=http://localhost:4001
REACT_APP_GOOGLE_OAUTH_REDIRECT=http://localhost:4001/api/sessions/oauth/google
```

* Open your browser and navigate to http://localhost:3000 to access the application.
