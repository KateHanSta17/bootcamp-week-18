const mongoose = require('mongoose');

// TODO: Define a new schema named `bookSchema`
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
});

// TODO: Create a custom instance method named `getDiscount`
bookSchema.methods.getDiscount = function () {
    console.log(`This book is ${this.title} and costs $${this.price}.`);
    console.log(`If you buy it now, you can get it for $${this.price * 0.9}.`);
};

// TODO: Create a model named `Book`
const Book = mongoose.model('Book', bookSchema);

// TODO: Create a new instance of the model
const book = new Book({ title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 10 });


// TODO: Call the custom instance method on the instance
book.getDiscount();

module.exports = Book;
