const lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt"),
});

const chart = [];
let takenSeats = 0;
const seats = 93;
const rows = 96;

const checkSeat = (y, x) => {
  if (y < 0 || y > rows || x < 0 || x > seats || chart[y][x] === "L")
    return "L";
  if (chart[y][x] === "#") return "#";
  return ".";
};

lineReader.on("line", (line) => {
  chart.push(line.split(""));
});

// Part 1
const checkAdjacent = (y, x) => {
  let occupieds = 0;

  if (checkSeat(y - 1, x - 1) === "#") occupieds++;
  if (checkSeat(y - 1, x) === "#") occupieds++;
  if (checkSeat(y - 1, x + 1) === "#") occupieds++;
  if (checkSeat(y, x - 1) === "#") occupieds++;
  if (checkSeat(y, x + 1) === "#") occupieds++;
  if (checkSeat(y + 1, x - 1) === "#") occupieds++;
  if (checkSeat(y + 1, x) === "#") occupieds++;
  if (checkSeat(y + 1, x + 1) === "#") occupieds++;

  return occupieds;
};

// Part 2
const checkDirection = (y, x, dir = [0, 0]) => {
  y += dir[0];
  x += dir[1];

  return checkSeat(y, x) === "." ? checkDirection(y, x, dir) : checkSeat(y, x);
};

const checkLineOfSight = (y, x) => {
  let occupieds = 0;

  if (checkDirection(y, x, [-1, -1]) === "#") occupieds++;
  if (checkDirection(y, x, [-1, 0]) === "#") occupieds++;
  if (checkDirection(y, x, [-1, 1]) === "#") occupieds++;
  if (checkDirection(y, x, [0, 1]) === "#") occupieds++;
  if (checkDirection(y, x, [1, 1]) === "#") occupieds++;
  if (checkDirection(y, x, [1, 0]) === "#") occupieds++;
  if (checkDirection(y, x, [1, -1]) === "#") occupieds++;
  if (checkDirection(y, x, [0, -1]) === "#") occupieds++;

  return occupieds;
};

const updateSeats = (seatingChart) => {
  Object.keys(seatingChart).forEach((seat) => {
    let y = seat.split(", ")[0];
    let x = seat.split(", ")[1];
    chart[y][x] = seatingChart[seat];
  });
  check = Object.keys(seatingChart).length > 0;
};

let check = true;

lineReader.on("close", () => {
  while (check) {
    let seatingChart = {};
    for (let y = 0; y < chart.length; y++) {
      for (let x = 0; x < chart[y].length; x++) {
        if (chart[y][x] === "L") {
          // Part 1
          if (checkAdjacent(y, x) === 0) seatingChart[`${y}, ${x}`] = "#";

          // Part 2
          //   if (checkLineOfSight(y, x) === 0) seatingChart[`${y}, ${x}`] = "#";
        } else if (chart[y][x] === "#") {
          // Part 1
          if (checkAdjacent(y, x) >= 4) seatingChart[`${y}, ${x}`] = "L";

          // Part 2
          //   if (checkLineOfSight(y, x) >= 5) seatingChart[`${y}, ${x}`] = "L";
        }
      }
    }
    updateSeats(seatingChart);
  }
  chart.forEach((y) => {
    y.forEach((x) => {
      if (x === "#") takenSeats++;
    });
  });
  console.log("Result:", takenSeats);
});
