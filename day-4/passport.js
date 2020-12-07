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
      // Part 2 validation:
      let valid = true;
      let { byr, iyr, eyr, hgt, hcl, ecl, pid, cid } = passport;
      if (+byr < 1920 || +byr > 2002) valid = false;
      if (+iyr < 2010 || +iyr > 2020) valid = false;
      if (+eyr < 2020 || +eyr > 2030) valid = false;
      if (!hgt.toString().match(/cm/) && !hgt.toString().match(/in/))
        valid = false;
      if (hgt.toString().match(/cm/)) {
        hgt = +hgt.slice(0, hgt.length - 2);
        if (hgt < 150 || hgt > 193) valid = false;
      }
      if (hgt.toString().match(/in/)) {
        hgt = +hgt.slice(0, hgt.length - 2);
        if (hgt < 59 || hgt > 76) valid = false;
      }
      if (hcl[0] !== "#" || hcl.slice(1).length !== 6) valid = false;
      if (!["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(ecl))
        valid = false;
      if (pid.length !== 9) valid = false;

      if (valid) sum++;
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
