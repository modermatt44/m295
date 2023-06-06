const https = require('https');

function fechtAsync(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))

    https.get(url, (response) => {
        response.setEncoding('utf8');
        response.on('data', console.log);
        response.on('error', console.error);
    }
    ).on('error', console.error);
}

async function fechtAsyncAwait(url) {
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    console.log('async/await')
}

fechtAsyncAwait('https://the-trivia-api.com/v2/questions');
fechtAsync('https://the-trivia-api.com/v2/questions');