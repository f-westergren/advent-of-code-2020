const fs = require('fs');
const argv = process.argv;

async function getExpenses(expenses) {
  let arr = [];
  fs.readFile(expenses, 'utf8', (err, data) => {
    if (err) {
      console.log('ERROR:', err);
      process.kill(1);
    }
    arr = data.toString().replace(/\r\n/g,'\n').split('\n');
    arr = arr.sort((a, b) => a - b)

    let sum = 0;
    let start = 0;
    let end = arr.length-1;

    while (start < end) {
      sum = +arr[start] + +arr[end]
      if (sum === 2020) {
        console.log( `${arr[start]} ${arr[end]} ${arr[start] * arr[end]}`)
        break;
      }
      if (sum > 2020) end = end-1
      if (sum < 2020) start = start+1
    }
  })
}

getExpenses(argv[2])