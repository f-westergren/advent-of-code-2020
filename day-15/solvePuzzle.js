const input = [7, 12, 1, 0, 16, 2];

const checkNum = (check, nums) => {
  let seen = undefined;
  for (let i = nums.length - 2; i >= 0; i--) {
    if (nums[i] === check && seen === undefined) {
      seen = i;
    }
  }
  if (seen !== undefined) {
    return nums.length - 1 - seen;
  }
  return 0;
};

while (input.length < 2020) {
  let last = input[input.length - 1];
  input.push(checkNum(last, input));
}

console.log(input[2019]);
