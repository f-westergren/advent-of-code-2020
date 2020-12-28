const lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt"),
});

const luggage = [];
let bagsList = [];
let goldBagContent = [];

lineReader.on("line", (line) => {
  if (line.indexOf(" shiny gold") !== -1)
    bagsList.push(line.split(" bags contain")[0]);
  luggage.push(line);
});

// Part 1
const findBags = (bags) => {
  let newBags = [];
  bags.forEach((bag) => {
    luggage.forEach((item) => {
      if (item.indexOf(` ${bag}`) !== -1) {
        newBags.push(item.split(" bags contain")[0]);
      }
    });
  });
  if (newBags.length > 0) {
    bagsList.push(...newBags);
    findBags(newBags);
  }
};

// Part 2
const countBags = (line) => {
  let newBags = [];

  if (line.match(/no\sother/g)) return newBags;

  let regex = /\d\s/g;
  let bags = line
    .replace(/\sbags,\s|\sbags.|\sbag,\s|\sbag./g, "")
    .split(regex)
    .slice(1);
  let nums = line.match(regex);

  bags.forEach((bag, idx) => {
    for (let i = 0; i < nums[idx]; i++) {
      newBags.push(bag);
    }
  });
  return newBags;
};

const findBag = (bag) => {
  let check = false;
  let i = -1;
  while (!check) {
    i++;
    if (luggage[i].startsWith(bag)) check = true;
  }
  return luggage[i];
};

const checkBags = (bags) => {
  let newBags = [];
  bags.forEach((bag) => {
    let line = findBag(bag);
    newBags.push(...countBags(line));
  });
  if (newBags.length > 0) {
    goldBagContent.push(...newBags);
    checkBags(newBags);
  }
};

lineReader.on("close", () => {
  // Part 1
  findBags(bagsList);
  console.log("Part 1:", [...new Set(bagsList)].length);

  // Part 2
  checkBags(["shiny gold"]);
  console.log("Part 2:", goldBagContent.length);
});
