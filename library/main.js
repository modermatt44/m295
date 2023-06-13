const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const fromHelper = bodyParser.urlencoded({ extended: false });

// Define a list of books
const books = [
    {
        title: 'The Alchemist',
        description: "nice book",
    },
    {
        title: 'The Alchemist2',
        description: 'nice book2',
    },
    {
        title: 'The Alchemist3',
        description: 'nice book3',
    },
    {
        title: 'The Alchemist4',
        description: 'nice book4',
    },
]

// GET Endpoint to get a list of books
app.get('/books', (req, res) => {
    res.send(books);
}
);

// GET Endpoint to get a book from the list of books and return status code 200 if the book was found and 404 otherwise
app.get('/books/:title', (req, res) => {
    const title = req.params.title;
    const book = books.find(book => book.title === title);
    if (book) {
        res.send(book);
    } else {
        res.sendStatus(404);
    }
}
);

// POST Endpoint to add a book to the list of books using a Form
app.post('/books', fromHelper, (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const book = books.find(book => book.title === title);
    if (book) {
        res.sendStatus(409);
    } else if (!description || !title) {
        res.sendStatus(422);
    } else {
        books.push({ title: title, description: description });
        res.sendStatus(201);
    }
}
);

// PUT Endpoint to override a book from the list of books using a JSON object as body and return status code 204 if the book was updated and 404 otherwise
app.put('/books/:title', fromHelper, (req, res) => {
    const title = req.params.title;
    const titleparams = req.body.title;
    const description = req.body.description;
    const book = books.find(book => book.title === title);
    if (book && description && titleparams) {
        Object.assign(book, { title: titleparams, description: description })
        res.send(`Updated book with title "${title}"`);
        res.sendStatus(204);
    } else if(!description || !titleparams){
        res.sendStatus(422);
    } else {
        res.sendStatus(404);
    }
}
);

// DELETE Endpoint to delete a book from the list of books and return status code 204 if the book was deleted and 404 otherwise
app.delete('/books/:title', fromHelper, (req, res) => {
    const title = req.params.title;
    const book = books.find(book => book.title === title);
    if (book) {
        const index = books.indexOf(book);
        books.splice(index, 1);
        res.send(`Deleted book with title "${title}"`);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
}
);

// Listen on port 3000
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
}
);
    