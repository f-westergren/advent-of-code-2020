const fs = require("fs");
const argv = process.argv;

const traverse = (x, arr, y) => {
  let sum = 0;
  let i = x;
  let arrLen = arr[0].length;
  for (let j = y; j < arr.length; j += y) {
    if (arr[j][i] === "#") sum++;
    i += x;
    if (i >= arrLen) i = i - arrLen;
  }
  return sum;
};

async function getInput(input) {
  let arr = [];
  fs.readFile(input, "utf8", (err, data) => {
    if (err) {
      console.log("ERROR:", err);
      process.kill(1);
    }
    arr = data.toString().replace(/\r\n/g, "\n").split("\n");

    console.log(`Part 1 answer: ${traverse(3, arr, 1)}`);
    console.log(
      `Part 2 answer: ${
        traverse(1, arr, 1) *
        traverse(3, arr, 1) *
        traverse(5, arr, 1) *
        traverse(7, arr, 1) *
        traverse(1, arr, 2)
      }`
    );
  });
}

getInput(argv[2]);
