// Creates a async function that returns integers afer a simulated delay of 2 seconds.

/*function delay() {
    return new Promise(resolve => setTimeout(resolve, 2000));
}

async function delayedLog(item) {
    await delay();
    console.log(item);
}

async function processArray(array) {
    for (const item of array) {
        await delayedLog(item);
    }
    setTimeout(() => console.log('Done!'), 2000);
}

processArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

*/


// Funcion that sumns two numbers after a delay of in parameter given milliseconds.

/*function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function sum(a, b) {
    await delay(2000);
    return a + b;
}

async function processArray(array) {
    for (const item of array) {
        console.log(await sum(item, item));
    }
    console.log('Done!');
}

processArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);*/



async function simuliereVerzoegerung(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
}

async function addiereNachVerzoegerung(a, b, ms) {
    await simuliereVerzoegerung(ms);
    return a + b;
}

const data = addiereNachVerzoegerung(1, 2, 2000).then((data) => {
    data += 1;
});

console.log(data);
