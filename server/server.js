const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect to the mongodb database url - "/sharktypers" - is the database collection we're accessing.
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

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({
      username,
      password
    });

    // Save new user to database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`)
})