const fs = require("fs");
const argv = process.argv;

async function getInput(input) {
  let arr = [];
  fs.readFile(input, "utf8", (err, data) => {
    if (err) {
      console.log("ERROR:", err);
      process.kill(1);
    }
    arr = data.toString().replace(/\r\n/g, "\n").split("\n");

    let sum = 0;
    arr.forEach((x) => {
      let pwArr = x.split(" ");
      let min = +pwArr[0].split("-")[0];
      let max = +pwArr[0].split("-")[1];
      let count = 0;
      let regex = new RegExp(pwArr[1][0], "g");
      if (pwArr[2].match(regex)) count = pwArr[2].match(regex).length;
      if (count <= max && count >= min) sum++;
    });
    console.log(sum);
  });
}

getInput(argv[2]);
