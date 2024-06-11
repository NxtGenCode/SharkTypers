const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// Secret key for signing JWTs
const secretKey = 'x0Xta34-1Xop_w4123mn-_ax345__p21ffdbySBAYasbyaabYASYhAafj.Losasretr';

// Middleware for parsing JSON bodies from incoming requests
// This middleware parses JSON-formatted request bodies and makes
// the parsed data available in the req.body property of incoming requests
app.use(bodyParser.json());
// Middleware for parsing cookies from incoming requests
// This middleware parses cookies attached to the request headers
// and makes them available in the `req.cookies` object for further processing
app.use(cookieParser());

//The MongoDB Database url: The "/sharktypers" part - is the Database Collection we're targeting.
const uri = "mongodb+srv://easy317:football12345@sharktyper.youhd87.mongodb.net/sharktypers";

mongoose.connect(uri);

const { Schema } = mongoose;
const userSchema = new Schema({
  username: { type: String },
  password: { type: String },
  email: { type: String },
  role: { type: String }
});

const User = mongoose.model('users', userSchema);

app.get('/api/check-auth', (req, res) => {
  // Check if the user is authenticated based on the presence of the auth cookie
  if (req.cookies.authToken) {
      // If the auth cookie is present, the user is authenticated
      res.status(200).json({ loggedIn: true });
      console.log('logged innnn')
  } else {
      // If the auth cookie is not present, the user is not authenticated
      res.status(401).json({ loggedIn: false });
      console.log('not logged innn')
  }
});

app.post('/api/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({
      username,
      password,
      email,
      role: 'member'
    });

    // Save new user to database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user and password MATCH
    const existingUser = await User.findOne({ username });
    console.log('username: '+username);
    if (!existingUser) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check password
    if (existingUser.password !== password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }


    // Generate JWT token
    const token = jwt.sign({ existingUser }, secretKey, { expiresIn: '1h' });

    // Set token as a cookie
    res.cookie('authToken', token, { httpOnly: true, secure: true });
    res.send('Login successful');


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
})