let departureTime = 1000053;
let buses =
  "19,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,523,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,13,x,x,x,x,23,x,x,x,x,x,29,x,547,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,17";

// Part 1
let busList = buses
  .split(",")
  .filter((bus) => bus !== "x")
  .map((bus) => +bus);

const checkDeparture = () => {
  let busNumber;
  let waitTime = undefined;
  busList.forEach((bus) => {
    let minutes = bus * Math.floor(departureTime / bus) + bus - departureTime;
    if (minutes < waitTime || !waitTime) {
      waitTime = minutes;
      busNumber = bus;
    }
  });
  console.log("Answer Part 1:", waitTime * busNumber);
};

// Part 2
let timeTable = {};
let timeTableList = buses.split(",");

for (let i = 1; i < timeTableList.length; i++) {
  if (timeTableList[i] !== "x") timeTable[i] = +timeTableList[i];
}

let check = false;
let i = 1;

while (!check) {
  check = true;
  i++;
  let firstDep = i * +timeTableList[0];
  check = !Object.keys(timeTable).some(
    (x) => ((firstDep + +x) / timeTable[x]) % 1 !== 0
  );
  console.log(firstDep, check);
}
