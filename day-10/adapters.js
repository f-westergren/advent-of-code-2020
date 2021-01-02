const lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt"),
});

const adapters = [];

lineReader.on("line", (line) => {
  adapters.push(+line);
});

const findJumps = (array) => {
  let ones = 0;
  let threes = 0;

  // Add charging outlet input (always 0)
  array.push(0);
  array.sort((a, b) => a - b);

  // Add device built-in adapter (always 3 jolts higher than highest adapter)
  array.push(array[array.length - 1] + 3);

  for (let i = 0; i < array.length - 1; i++) {
    array[i + 1] - array[i] === 1 ? ones++ : threes++;
  }
  return ones * threes;
};

// Room for part 2

lineReader.on("close", () => {
  console.log(findJumps(adapters));
});
