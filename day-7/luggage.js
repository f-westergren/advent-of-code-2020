const lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt"),
});

const luggage = [];
let bagsList = [];
lineReader.on("line", (line) => {
  if (line.indexOf(" shiny gold") !== -1)
    bagsList.push(line.split(" bags contain")[0]);
  luggage.push(line);
});

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

lineReader.on("close", () => {
  findBags(bagsList);
  console.log("Part 1:", [...new Set(bagsList)].length);
});
