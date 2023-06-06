// Create a function that doubles a number and calls a callback with the result of the double.

function double(number, callback) {
    callback(null, number * 2);
}

double(3, (err, result) => {
    if (err) throw err;
    console.log(result);
}
);

function divide (zahl, zahl1){
    return new Promise(function(resolve, reject){
        if (zahl1 == 0){
            reject("Division durch 0 nicht möglich");
        }
        else{
            resolve(zahl/zahl1);
        }
    })
}

divide(10, 2).then((result) =>{
    console.log(result);
}
).catch((error) => {
    console.log(error);
}
);