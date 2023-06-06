const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hallo Welt!');
});

// Redirect to Zli
app.get('/zli', (req, res) => {
    res.redirect('https://www.zli.ch');
});

// Return current time
app.get('/now', (req, res) => {
    res.send(new Date().toLocaleTimeString());
});

// Return a random name from a list of twenty names
app.get('/name', (req, res) => {
    // Twenty names
    const names = ['Hans', 'Peter', 'Fritz', 'Hanspeter', 'Fritzpeter', 'Hansfritz', 'Peterhans', 'Fritzpeterhans', 'Hansfritzpeter', 'Peterhansfritz', 'Fritzpeterhanspeter', 'Hansfritzpeterhans', 'Peterhansfritzpeter', 'Fritzpeterhansfritz', 'Hansfritzpeterhanspeter', 'Peterhansfritzpeterhans', 'Fritzpeterhansfritzpeter', 'Hansfritzpeterhansfritz', 'Peterhansfritzpeterhans', 'Fritzpeterhansfritzpeterhans'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    res.send(randomName);
});

// Return a static HTML page from Server
app.get('/html', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Return a image from Server
app.get('/image', (req, res) => {
    res.sendFile(__dirname + '/serverImage.jpg');
});

// Return status code 418
app.get('/teapot', (req, res) => {
    res.status(418).send('I\'m a teapot');
});

// Return user-agent
app.get('/user-agent', (req, res) => {
    res.send(req.headers['user-agent']);
});

// Return status code 403
app.get('/secret', (req, res) => {
    res.status(403).send('Forbidden');
});

// Return XML from Server
app.get('/xml', (req, res) => {
    res.sendFile(__dirname + '/serverXML.xml');
});

// Return JSON from Server
app.get('/me', (req, res) => {
    const me = {
        name: 'Hans',
        age: 20,
        city: 'Zürich'
    };
    //res.json(me);
    //res.send(me);
    const query = req.query.name;
    // Disable to be able to write Js and HTML code in the query

    res.send(`<h1>${query}</h1>`);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});