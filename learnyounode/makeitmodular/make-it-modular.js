// Creates a programm for displaying a list of files in a given directory, filtered by the extension of the files.

const mymodule = require('./mymodule.js');

mymodule(process.argv[2], process.argv[3], (err, list) => {
    if (err) throw err;
    list.forEach((file) => {
        console.log(file);
    });
}
);