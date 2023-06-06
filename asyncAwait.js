// Creates a async function that returns integers afer a simulated delay of 2 seconds.

function delay() {
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
    console.log('Done!');
}

processArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

