const mongoose = require('mongoose');

// TODO: Add a comment describing the functionality of the code below
// The bookSchema is a blueprint for the Book model. It defines the structure of the documents that will be 
// stored in the Book collection.
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: false },
  publisher: String,
  stockCount: Number,
  price: Number,
  inStock: Boolean,
  lastAccessed: { type: Date, default: Date.now },
});

// TODO: Add a comment describing the functionality of the code below
// The Book model is created using the bookSchema blueprint. The model is used to interact with the Book collection.
const Book = mongoose.model('Book', bookSchema);

const handleError = (err) => console.error(err);

// TODO: Add a comment describing the functionality of the code below
// The Book model is used to create a new document in the Book collection. The document is created with the specified title, 
// author, publisher, stockCount, price, and inStock values.
Book
  .create({
    title: 'Diary of Anne Frank',
    author: 'Anne Frank',
    publisher: 'Scholastic',
    stockCount: 10,
    price: 10,
    inStock: true,
  })
  .then(result => console.log('Created new document', result))
  .catch(err => handleError(err));

// TODO: Add a comment describing the difference between this instance being created and the instance that was created above
// The Book model is used to create a new document in the Book collection. The document is created with the specified title and author.
Book
  .create({
    title: 'Oh the Places You Will Go!',
    author: 'Dr. Seuss'
  })
  .then(result => console.log('Created new document', result))
  .catch(err => handleError(err));

// TODO: Add a comment describing the difference between this instance being created and the instance that was created above
// The Book model is used to create a new document in the Book collection. The document is created with the specified title. 
Book.create({ title: 'Harold and the Purple Crayon' })
  .then(result => console.log('Created new document', result))
  .catch(err => handleError(err));

module.exports = Book;
