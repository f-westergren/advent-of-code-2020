const lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt"),
});

const input = [];

lineReader.on("line", (line) => {
  input.push(line);
});

// Part 1
const divide = (seats, start, end, char) => {
  let mid;
  seats.forEach((x) => {
    if (x === char) {
      mid = Math.ceil((start + end) / 2);
      start = mid;
    } else {
      mid = Math.floor((start + end) / 2);
      end = mid;
    }
  });
  return mid;
};

// Part 2
const ticketList = [];

const findSeat = (tickets) => {
  let seat = false;
  let i = 0;
  while (!seat) {
    i++;
    if (tickets[i] + 1 !== tickets[i + 1]) seat = tickets[i] + 1;
  }
  return seat;
};

const findHighest = (tickets) => {
  let id = 0;
  tickets.forEach((ticket) => {
    let rows = ticket.slice(0, 7).split("");
    let columns = ticket.slice(7).split("");
    let seatId = divide(rows, 0, 127, "B") * 8 + divide(columns, 0, 7, "R");
    if (seatId > id) id = seatId;

    // Part 2
    ticketList.push(seatId);
  });
  console.log("Part 1:", id);
  ticketList.sort((a, b) => a - b);
  console.log("Part 2:", findSeat(ticketList));
};

lineReader.on("close", () => {
  findHighest(input);
});
