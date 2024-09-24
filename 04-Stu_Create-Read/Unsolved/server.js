const express = require('express');
const { MongoClient } = require('mongodb');
// line 2 is to fetch the package from mongodb to use the MongoClient

const app = express();
const port = 3001;

const connectionStringURI = `mongodb://127.0.0.1:27017`;
// this is the connection string to the database. Relates to big green button "create new" in compass.

const client = new MongoClient(connectionStringURI);
// this is where you create a new instance of the mongodb client. This is the client that will be used to connect to the database.

let db;
// this is the variable that will hold the database connection.

const dbName = 'inventoryDB';
// this is the name of the database that will be used.

client.connect() // this is the method that will connect to the mongodb server.
  .then(() => {
    console.log('Connected successfully to MongoDB');
    db = client.db(dbName);
// this is where you assign the database connection to the db variable. Creating a new DB instance (or storing the value of the db instance)
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Mongo connection error: ', err.message);
  });

app.use(express.json());



app.post('/books', (req, res) => { // this is the route that will be used to add a new book to the database. 
  db.collection('bookCollection').insertOne( // this is the method that will insert a new document (one) into the collection. Keyword = insertOne
    { title: req.body.title, author: req.body.author }
  )
    .then(results => res.json(results)) // this is the response that will be sent back to the client.
    .catch(err => { // this is the error handling.
      if (err) throw err;
    });
});

app.post('/books/seed', (req, res) => { // this is the route that will be used to add multiple books to the database.
  db.collection('bookCollection').insertMany( // this is the method that will insert multiple documents into the collection. Keyword = insertMany
    [
      { "title": "Oh the Places We Will Go!" },
      { "title": "Diary of Anne Frank" }
    ]
  )
    .then(results => res.json(results)) // this is the response that will be sent back to the client.
    .catch(err => { // this is the error handling.
      if (err) throw err;
    });
});

app.get('/books', (req, res) => { // this is the route that will be used to get all the books from the database.
  db.collection('bookCollection') // this is the method that will get all the documents from the collection. Keyword = find
    .find({}) // this is the method that will get all the documents from the collection. Keyword = find
    .toArray() // this is the method that will convert the documents into an array. (by default it already does that behind the scenes)
    .then(results => res.json(results))
    .catch(err => {
      if (err) throw err;
    });
});
