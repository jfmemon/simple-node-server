const express = require('express');
const app = express();
const cors = require('cors');
const users = require('./Data/Data.json');
const port = process.env.PORT || 5000;

app.use(cors());      // middle wire ( zogshuttro )
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running.')
})

app.get('/users', (req, res) => {
  res.send(users);
})

app.post('/users', (req, res) => {
  console.log('POST API called.');
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);
  console.log(user);
  res.send(user);
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
