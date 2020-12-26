const lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt"),
});

let input = [];

// Part 1
const checkPreamble = (preamble, num) => {
  preamble = preamble.sort((a, b) => a - b);
  let start = 0;
  let end = preamble.length - 1;
  while (start < end) {
    let sum = preamble[start] + preamble[end];
    if (sum === num) return true;
    if (sum < num) start++;
    else if (sum > num) end--;
  }
  return false;
};

// Part 2
const checkContiguous = (data, target) => {
  let sum = 0;
  let nums = [];
  let i = 0;
  let j = 1;
  while (sum !== target) {
    if (sum < target) {
      sum += data[j];
      nums.push(data[j]);
      j++;
    } else if (sum > target) {
      i++;
      j = i + 1;
      nums = [];
      sum = 0;
    }
  }
  return Math.min(...nums) + Math.max(...nums);
};

lineReader.on("line", (line) => {
  input.push(+line);
});

lineReader.on("close", () => {
  // Part 1
  let i = 0;
  let check = true;
  while (check && i < input.length) {
    i++;
    check = checkPreamble(input.slice(i, i + 25), input[i + 25]);
  }
  console.log("Part 1:", input[i + 25]);
  // Part 2
  console.log("Part 2:", checkContiguous(input, input[i + 25]));
});
