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