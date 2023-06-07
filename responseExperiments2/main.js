const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const fromHelper = bodyParser.urlencoded({ extended: false });

app.get('/now', (req, res) => {
    let timeZoneQuery = req.query.tz;
    res.send(new Date().toLocaleTimeString("de-CH", { timeZone: timeZoneQuery }));
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
}
);

// POST Endpoint to add a name to a list of names using a Form
const names = [];
app.post('/name', fromHelper, (req, res) => {
    const name = req.body.name;
    names.push(name);
    res.send(`Added ${name} to the list of names`);
}
);

// GET Endpoint to get a list of names
app.get('/name', (req, res) => {
    res.send(names);
}
);

// DELETE Endpoint to delete a name from the list of names and return status code 204
app.delete('/name', fromHelper, (req, res) => {
    const name = req.body.name;
    const index = names.indexOf(name);
    if (index > -1) {
        names.splice(index, 1);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
}
);

// Endpoint /secret2 which returns authorization with status code 200 if it is 'Basic aGFja2VyOjEyMzQ=' and returns 401 otherwise
app.get('/secret2', (req, res) => {
    const auth = req.headers.authorization;
    if (auth === 'Basic aGFja2VyOjEyMzQ=') {
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
}
);

// Endpoint /chuck which returns a random Chuck Norris joke. In the text "Chuck Norris" should be replaced with the name given in the query parameter name
app.get('/chuck', (req, res) => {
    const name = req.query.name;
    fetch(`https://api.chucknorris.io/jokes/random?name=${name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then((data) => {
            res.send(data.value);
        }
        );

});

// PATCH Endpoint /me which takes a JSON Object and overwrites the properties of the user object with the properties of the JSON Object
const me = {
    name: 'Hans Muster',
    age: 42,
    email: 'hans.muster@gmail.com'
};

app.patch('/me', fromHelper, (req, res) => {
    const body = req.body;
    for (const key in body) {
        if (Object.hasOwnProperty.call(body, key)) {
            const element = body[key];
            me[key] = element;
        }
    }
    res.send(me);
}
);