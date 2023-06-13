const express = require('express');
const app = express();
const session = require('express-session');
const { urlencoded } = require('body-parser');
const fromHelper = urlencoded({ extended: false });

// Session middleware which creates a session object
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false
}));

// POST endpoit which takes a parameter "name" and saves its value in the session using cookie
app.post('/name/:name', (req, res) => {
    req.session.cookieName = req.params.name;
    res.send('OK');
});

// GET endpoint which returns the value of the session variable "name"
app.get('/name', (req, res) => {
    res.send(req.session.cookieName);
});

// DELETE endpoint which deletes the session variable "cookieName"
app.delete('/name', (req, res) => {
    delete req.session.cookieName;
    res.send('OK');
});



app.listen(3000, () => console.log('Server ready'))