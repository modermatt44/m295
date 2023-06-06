// Exports a function that takes a directory name, a filename extension string and a callback function

const fs = require('fs');
const path = require('path');

module.exports = function (dir, ext, callback) {
    fs.readdir(dir, (err, list) => {
        if (err) return callback(err);
        const filteredList = list.filter((file) => {
            return path.extname(file) === '.' + ext;
        });
        callback(null, filteredList);
    });
};