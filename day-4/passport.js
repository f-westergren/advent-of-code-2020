const lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt"),
});

let passports = [];
let obj = {};
lineReader.on("line", (line) => {
  if (line !== "") {
    if (line.indexOf(" ") === -1) {
      data = line.split(":");
      obj[data[0]] = data[1];
    } else {
      let arr = line.replace("\n", " ").split(" ");
      arr.forEach((data) => {
        data = data.split(":");
        obj[data[0]] = data[1];
      });
    }
  } else {
    passports.push(obj);
    obj = {};
  }
});

lineReader.on("close", () => {
  passports.push(obj);
  let sum = 0;
  passports.forEach((passport) => {
    let passLen = Object.keys(passport).length;

    if (passLen === 8 || (passLen === 7 && !passport.hasOwnProperty("cid"))) {
      sum++;
    }
  });
  console.log(sum);
});

// async function getInput(input) {
//   let arr = [];
//   fs.readFile(input, "utf8", (err, data) => {
//     if (err) {
//       console.log("ERROR:", err);
//       process.kill(1);
//     }
//     arr = data.toString().replace(/\r\n/g, "\n").split("\n\n");
//     let passports = [];
//     arr.forEach((x) => {
//       x = x.split(" ");
//       passports.push(x);
//     });
//   });
// }

// getInput(argv[2]);
