const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const jsonValidator = require('json-validator')

const fromHelper = bodyParser.urlencoded({ extended: false });
const localDate = new Date().toLocaleDateString('de-CH', { timeZone: 'Europe/Zurich' });

// Define a list of lendings
const lendings = [
    {
        id: 1,
        customer_id: 4,
        isbn: '1',
        borrowed_at: localDate,
        returned_at: null,
    },
    {
        id: 2,
        customer_id: 1,
        isbn: '2',
        borrowed_at: localDate,
        returned_at: null,
    },
    {
        id: 3,
        customer_id: 3,
        isbn: '3',
        borrowed_at: localDate,
        returned_at: null,
    },
    {
        id: 4,
        customer_id: 2,
        isbn: '4',
        borrowed_at: localDate,
        returned_at: null,
    },
]

// Check if Customer lented more than three books
const test = function checkLendings(customer_id) {
    const lendingsd = lendings.filter(lendings => lendings.customer_id == customer_id);
    if (lendingsd.length >= 3) {
        return true;
    } else {
        return false;
    }
}

async function isValid(){
    return new Promise((resolve, reject) => {
        jsonValidator.validate(lends, lendSchema, function(err, messages){
            resolve(messages)
        })  
    })
}

// GET Endpoint to get a list of lendings
app.get('/lends', (req, res) => {
    res.send(lendings);
}
);

// GET Endpoint to get a lending from the list of lendings and return status code 200 if the lending was found and 404 otherwise
app.get('/lends/:id', (req, res) => {
    const id = req.params.id;
    const lending = lendings.find(lending => lending.id == id);
    if (lending) {
        res.send(lending);
    } else {
        res.sendStatus(404);
    }
}
);

// POST to lend a book to a customer
// If the book is already lent, return status code 409

app.post('/lends', fromHelper, (req, res) => {
    const customer_id = req.body.customer_id;
    const isbn = req.body.isbn;
    const lending = lendings.find(lending => lending.isbn == isbn);
    if (lending) {
        res.status(409).send("Already lent");
    } else if (!customer_id || !isbn) {
        res.sendStatus(400);
    } else if (test(customer_id)) {
        res.status(409).send("Customer already lent three books");
    }
    else {
        const id = lendings.length + 1;
        const borrowed_at = localDate;
        const returned_at = null;
        lendings.push({ id, customer_id, isbn, borrowed_at, returned_at });
        res.status(201).send({ id, customer_id, isbn, borrowed_at, returned_at });
    }
}
);


// PATCH to change data of a lending
app.patch('/lends/:id', fromHelper, (req, res) => {
    const id = req.params.id;
    const customer_id = req.body.customer_id;
    const isbn = req.body.isbn;
    const returned_at = req.body.returned_at;
    const lending = lendings.find(lending => lending.id == id);
    if (lending) {
        if (customer_id) {
            lending.customer_id = Number(customer_id);
        }
        if (isbn) {
            lending.isbn = isbn;
        }
        if (returned_at) {
            lending.returned_at = returned_at;
        }
        res.status(200).send(lending);
    } else {
        res.sendStatus(404);
    }
}
);

const lendSchema = {
    isbn: {
        required: true,
        isLength: 13 
    },
    customer_id: {
        required: true
    }
}

// Listen on port 3000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
}
);
