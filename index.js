const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
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


const uri = "mongodb+srv://user1:ybn00OwPw48IEtdU@cluster0.qp55ast.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const userCollection = client.db('simpleNode').collection('users');

    //to read user from db
    app.get('/users', async (req, res) => {
      const cursor = userCollection.find({});
      const users = await cursor.toArray();
      console.log(users);
      res.send(users);
    })

    app.post('/users', async (req, res) => {
      console.log('POST API called.');
      const user = req.body;
      
      const result = await userCollection.insertOne(user);

      user._id = result.insertedId;
      
      console.log(result);
      res.send(user);
      console.log(user);

      // users.push(user);
      // console.log(user);
    })

    // const user = {email : 'mahiya@gmail.com', password : 'mahiya'};
    // const result = await userCollection.insertOne(user);
    // console.log(result);
  }

  finally {


    // // Ensures that the client will close when you finish/error
    // console.log('database connected');
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
