const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3001;

const connectionStringURI = `mongodb://127.0.0.1:27017`;

const client = new MongoClient(connectionStringURI);

let db;

const dbName = 'authorListDB';

async function seedDBAndStartServer() {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
    db = client.db(dbName);
    // Drops any documents, if they exist
    await db.collection('authorList').deleteMany({});
    // Adds data to database
    const res = await db.collection('authorList').insertMany(data);
    console.log(res);

    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Mongo connection error: ', err.message);
  }
}

seedDBAndStartServer();

// Data for document
const data = [
  {
    title: 'Good Omens',
    authors: [
      { name: 'Neil Gaiman', featured: true },
      { name: 'Terry Pratchett', featured: true },
    ],
    information: { ISBN: 9780425132159, price: 10, total_in_stock: 10 },
  },
  {
    title: 'Heads You Lose',
    authors: [
      { name: 'Lisa Lutz', featured: false },
      { name: 'David Hayward', featured: false },
    ],
    information: { ISBN: 9780399157400, price: 20, total_in_stock: 8 },
  },
  {
    title: 'Between the Lines',
    authors: [
      { name: 'Jodi Picoult', featured: true },
      { name: 'Samantha Van Leer', featured: false },
    ],
    information: { ISBN: 9781451635751, price: 5, total_in_stock: 5 },
  },
];

app.use(express.json());

app.get('/authors/price-less-than-10', (req, res) => {
  db.collection('authorList')
    // Fixed: Used dot notation to access the nested 'price' field inside 'information'
    .find({ 'information.price': { $lt: 10 } })
    .toArray()
    .then(results => res.send(results))
    .catch(err => {
      if (err) throw err;
    });
});

app.get('/authors/featured', (req, res) => {
  db.collection('authorList')
    // Fixed: Used dot notation to access the 'featured' field inside the 'authors' array of embedded documents
    .find({ 'authors.featured': true })
    .toArray()
    .then(results => res.send(results))
    .catch(err => {
      if (err) throw err;
    });
});
