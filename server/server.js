const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000

const uri = "mongodb+srv://easy317:psNqjgHP4oQ0xkgj@sharktyper.youhd87.mongodb.net/sharktypers";

const { Schema } = mongoose;
const hiscoreSchema = new Schema({
  username: String, // String is shorthand for {type: String}
  score: Number,
  wins: Number,
  losses: Number,
});

app.get('/', (req, res) => {
  res.send('hello')
  main().catch(err => console.log(err));
})

app.get('/api/login', (req, res) => {
  res.send('creating new')
  register().catch(err => console.log(err));
})

async function register() {
  await mongoose.connect(uri);

  const User = mongoose.model('Users', hiscoreSchema);

  await User.create({
    username: 'Brolly',
    score: 200000,
    wins: 100003455,
    losses: 0
  });

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`)
})