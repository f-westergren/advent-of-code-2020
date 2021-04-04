const lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt"),
});

let ranges = [];
let myTicket = [];
let tickets = [];
let errorRate = 0;
let validTickets = [];

lineReader.on("line", (line) => {
  let digits = line.match(/\d+/g);

  if (line) {
    let initialDigit = line[0].match(/\d/);
    if (initialDigit && myTicket.length > 0) tickets.push(digits);
    else if (initialDigit && myTicket.length === 0) myTicket.push(digits);
    else if (digits) ranges.push(...digits);
  }
});

const checkNum = (ticket, range) => {
  let valid = true;
  ticket.forEach((num) => {
    let i = 0;
    let check = false;
    while (check === false && i < range.length - 1) {
      if (num >= parseInt(range[i]) && num <= parseInt(range[i + 1]))
        check = true;
      i += 2;
    }
    if (!check) {
      errorRate += parseInt(num);
      valid = false;
    }
  });
  return valid;
};

lineReader.on("close", () => {
  tickets.forEach((ticket) => {
    if (checkNum(ticket, ranges)) validTickets.push(ticket);
  });
  console.log("Error rate:", errorRate);
  console.log(tickets.length);
  console.log(validTickets.length);
});
