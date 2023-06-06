const fs = require('fs');

function leseDateiInhalt(filePath){
    return new Promise(function(resolve, reject){
        fs.readFile(filePath, function(err, data){
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        });
    });
}

leseDateiInhalt('promises.js').then((data) => {
    console.log(data.length);
}
).catch((error) => {
    console.log(error);
}
);

function read(pathToFile){
    return new Promise(function(resolve, reject){
        fs.readFile(pathToFile, (err, data) => {
            if (err){
                reject(err);
            }else{
                resolve(data)
            }
        })
    })
}

read('promsises.js').then((data) => {
    console.log(data.length)
})
