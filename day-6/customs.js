const lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt"),
});

const input = [];
let group = [];

lineReader.on("line", (line) => {
  if (line !== "") group.push(line);
  else {
    input.push(group);
    group = [];
  }
});

// Part 1
const createAnswers = (group) => {
  let answers = "";
  group.forEach((x) => {
    answers += x;
  });
  return answers;
};

const countAnswers = (group) => {
  let count = 0;
  let answers = createAnswers(group);
  answers = [...new Set(answers)];
  count += answers.length;
  return count;
};

//Part 2
const checkAnswers = (group) => {
  let count = 0;
  let answers = createAnswers(group);
  let answerObj = {};
  answers.split("").forEach((x) => {
    answerObj[x] = answerObj[x] + 1 || 1;
  });
  Object.keys(answerObj).forEach((answer) => {
    if (answerObj[answer] === group.length) count++;
  });
  return count;
};

lineReader.on("close", () => {
  let partOne = 0;
  let partTwo = 0;

  input.forEach((x) => {
    partOne += countAnswers(x);
    partTwo += checkAnswers(x);
  });

  console.log("Part 1:", partOne);
  console.log("Part 2:", partTwo);
});
