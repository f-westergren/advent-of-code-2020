const lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt"),
});

const directions = [];
let compass = { 0: "E", 90: "S", 180: "W", 270: "N" };
let degree = 0;
let manhattanDistance = [0, 0];
let waypoint = [
  { distance: 10, direction: 0 },
  { distance: 1, direction: 270 },
];

lineReader.on("line", (line) => {
  directions.push(line);
});

const turn = (current, num) => {
  current += num;
  if (current === 360) current = 0;
  else if (current > 360) current -= 360;
  else if (current < 0) current += 360;
  return current;
};

const moveShip = (input) => {
  let dir = input.slice(0, 1);
  const dis = +input.slice(1);

  if (dir === "R") degree = turn(degree, dis);
  if (dir === "L") degree = turn(degree, -dis);
  if (dir === "F") dir = compass[degree];
  if (dir === "E") manhattanDistance[0] += dis;
  if (dir === "W") manhattanDistance[0] -= dis;
  if (dir === "N") manhattanDistance[1] += dis;
  if (dir === "S") manhattanDistance[1] -= dis;
};

// Part 2
const moveWaypoint = (input) => {
  const dir = input.slice(0, 1);
  const dis = +input.slice(1);

  if (dir === "L")
    waypoint.forEach((x) => (x.direction = turn(x.direction, -dis)));
  if (dir === "R")
    waypoint.forEach((x) => (x.direction = turn(x.direction, dis)));
  if (waypoint[0].direction !== 0 && waypoint[0].direction !== 180) {
    const temp = waypoint[0];
    waypoint[0] = waypoint[1];
    waypoint[1] = temp;
  }
  if (dir === "F")
    waypoint.forEach((x) => {
      moveShip(`${compass[x.direction]}${Math.abs(x.distance) * dis}`);
    });
  if (dir === "N" || dir === "S") {
    dir === compass[waypoint[1].direction]
      ? (waypoint[1].distance += dis)
      : (waypoint[1].distance -= dis);
  }

  if (dir === "E" || dir === "W") {
    dir === compass[waypoint[0].direction]
      ? (waypoint[0].distance += dis)
      : (waypoint[0].distance -= dis);
  }

  if (waypoint[1].distance < 0) {
    waypoint[1].distance = Math.abs(waypoint[1].distance);
    waypoint[1].direction = waypoint[1].direction === 90 ? 270 : 90;
  }

  if (waypoint[0].distance < 0) {
    waypoint[0].distance = Math.abs(waypoint[0].distance);
    waypoint[0].direction = waypoint[0].direction === 0 ? 180 : 0;
  }
};

lineReader.on("close", () => {
  directions.forEach((x) => {
    // Part 1
    // moveShip(x);

    // Part 2
    moveWaypoint(x);
  });
  console.log(Math.abs(manhattanDistance[0]) + Math.abs(manhattanDistance[1]));
});
