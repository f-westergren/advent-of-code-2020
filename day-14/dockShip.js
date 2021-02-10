const lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt"),
});

let data = [];
let mask = "";

function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

const bin2dec = (bin) => {
  let arr = bin.split("");
  let len = arr.length;
  let pow = [];
  let decimal = [];
  for (let i = 0; i <= len - 1; i++) {
    pow.unshift(i);
  }
  arr.forEach((x, index) => {
    decimal.push(x * 2 ** pow[index]);
  });
  let toDecimal = decimal.reduce((acc, curr) => acc + curr, 0);
  return toDecimal;
};

lineReader.on("line", (line) => {
  if (line.slice(0, 4) === "mask") {
    mask = line.slice(7);
  } else {
    let nums = line.match(/\d+/g);
    nums.splice(1, 1, dec2bin(nums[1]));
    nums.push(mask);
    data.push(nums);
  }
});

let memory = {};

const runPartOne = (mem, val, mask, res = "") => {
  let output = "000000000000000000000000000000000000";
  let newValue = "";
  if (val.length < 36) val = output.slice(0, 36 - val.length) + val;
  if (res.length < 36) output = output.slice(0, 36 - res.length) + res;

  for (let i = 0; i < mask.length; i++) {
    if (mask[i] !== "X") newValue += mask[i];
    else if (mask[i] === "X" && val[i] !== output[i]) newValue += val[i];
    else newValue += output[i];
  }

  memory[mem] = newValue;
};

const runPartTwo = (mem, mask) => {
  let output = "";
  mask.split("").forEach((x, idx) => {
    if (x === "X") output += "X";
    else if (x !== "X" && x === "0") output += mem[idx];
    else if (x !== "X" && x === "1") output += 1;
  });

  return output;
};

const getAddress = (num, mask) => {
  let mem = dec2bin(num);
  let output = "000000000000000000000000000000000000";
  mem = output.slice(0, 36 - mem.length) + mem;

  console.log(mem);
  console.log(mask);
  console.log(runPartTwo(mem, mask));
};

lineReader.on("close", () => {
  let total = 0;

  data.forEach((x) => {
    memory[x[0]]
      ? runPartOne(x[0], x[1], x[2], memory[x[0]])
      : runPartOne(x[0], x[1], x[2]);
  });

  Object.keys(memory).forEach((x) => {
    total += bin2dec(memory[x]);
  });
  console.log("Part 1", total);
  getAddress("7625", "0101XX01X00X1X1011X1X000000101X10001");
});
