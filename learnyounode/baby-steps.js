//console.log(process.argv)



// Calculate the sum of the numbers (not strings) passed in as arguments

var sum = 0;
for (var i = 2; i < process.argv.length; i++) {
    sum += Number(process.argv[i]);
}
console.log(sum);

// To run this program, type the following into your terminal:
// node baby-steps.js 1 2 3
// ...and press enter. Notice that the output is:
// 0: node
// 1: /path/to/your/program/baby-steps.js
// 2: 1
// 3: 2
// 4: 3