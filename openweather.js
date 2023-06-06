const https = require('https');
let url ="https://the-trivia-api.com/v2/questions";

https.get(url, (response) => {
    response.setEncoding('utf8');
    response.on('data', console.log);
    response.on('error', console.error);
}
).on('error', console.error);