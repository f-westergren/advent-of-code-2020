const lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt"),
});

const runTask = (instructions, jumps = [], attempt = 0, rerun = false) => {
  let steps = JSON.parse(JSON.stringify(instructions));
  let last = true;
  let i = 0;
  let acc = 0;
  let cmds = Object.keys(steps).length;
  if (jumps.length > 0) {
    let step = steps[jumps[attempt]];
    step.cmd[0] === "j"
      ? (step.cmd = step.cmd.replace("jmp", "nop"))
      : (step = step.cmd.replace("nop", "jmp"));
  }
  while (i < cmds) {
    let { visited, cmd } = steps[i];
    let val = +steps[i].cmd.split(" ")[1];
    cmd = steps[i].cmd.split(" ")[0];

    if (visited) {
      // Uncomment for part 2
      last = false;
      runTask(instructions, jumps, attempt + 1, true);
      break;
    }

    if (cmd === "jmp") {
      steps[i].visited = true;
      if (!rerun) jumps.push(i);
      i += val;
    } else if (cmd === "acc") {
      steps[i].visited = true;
      acc += val;
      i++;
    } else if (cmd === "nop") {
      steps[i].visited = true;
      if (!rerun) jumps.push(i);
      i++;
    }
  }
  if (last) console.log(`Answer:`, acc);
};

let instructions = {};
let i = 0;
lineReader.on("line", (line) => {
  instructions[i] = { cmd: line, visited: false };
  i++;
});

lineReader.on("close", () => {
  let jumps = [];
  runTask(instructions);
});
