const { EXPENSES } = require('./expenses');

// Specifically, they need you to find the two entries that sum to 2020 and then multiply those two numbers together.
// Algorithm:
// Sort numbers
// Get largest number A.
// Subtract 2020 from it (this is the number we search for).
// Do a binary search on array (without given number A).
// If found, return number and found number.
// If not found, do the same, but without the number A.

function binarySearch(value, array) {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const currentIndex = Math.floor((left + right) / 2);

    if (array[currentIndex] > value) {
      left = currentIndex + 1;
    } else if (array[currentIndex] < value) {
      right = currentIndex - 1;
    } else {
      return currentIndex;
    }
  }

  return null;
}

function findSumNumbers(sortedArray, sum) {
  for (let i = 0; i < sortedArray.length; i++) {
    const biggestNumber = sortedArray[i];
    const valueToSearchFor = sum - biggestNumber;
    const foundNumber = binarySearch(valueToSearchFor, sortedArray.slice(i + 1));

    if (foundNumber !== null) {
      return [biggestNumber, valueToSearchFor];
    }
  }

  return null;
}

const sortedExpenses = EXPENSES.sort((a, b) => b - a);
const numbers = findSumNumbers(sortedExpenses, 2020);
console.log('numbers: ', numbers);
console.log('numbers[0] * numbers[1]: ', numbers[0] * numbers[1]);

// In your expense report, what is the product of the three entries that sum to 2020?
// Algorithm:
// Sort numbers
// Get largest number A.
// Subtract 2020 from it (this is the sum of the numbers we search for).
// Call the function used in previous algorithm to get the numbers that sum to the result of subtracting 2020 from biggest number.

function findSumOfThreeNumbers(sortedArray) {
  for (let i = 0; i < sortedArray.length; i++) {
    const biggestNumber = sortedArray[i];
    const valueToSearchFor = 2020 - biggestNumber;
    const foundNumbers = findSumNumbers(sortedArray.slice(i + 1), valueToSearchFor);

    if (foundNumbers !== null) {
      return [biggestNumber, ...foundNumbers];
    }
  }
}

const threeNumbers = findSumOfThreeNumbers(sortedExpenses);
console.log('threeNumbers: ', threeNumbers);
console.log('threeNumbers[0] * threeNumbers[1] * threeNumbers[2]: ', threeNumbers[0] * threeNumbers[1] * threeNumbers[2]);
