const readline = require('readline');
const fs = require('fs');

const TREE = '#';


const countTrees = async (stepX, stepY) => {
  let numberOfTrees = 0;
  let positionX = 0;
  let widthOfPattern = null;
  let currentLine = 0;
  const readInterface = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    output: process.stdout,
    console: false,
  });

  for await (const line of readInterface) {
    if (currentLine % stepY !== 0) {
      currentLine++;
      continue;
    }
    currentLine++;

    const resultingMove = line.substr(positionX, 1);

    if (widthOfPattern === null) {
      widthOfPattern = line.length;
    }

    positionX = (positionX + stepX) % widthOfPattern;

    if (resultingMove === TREE) {
      numberOfTrees++;
    }
  }

  return numberOfTrees;
};

countTrees(3, 1)
  .then((number) => {
    console.log('number of trees moving 3 right and 1 down: ', number);
  });

Promise.all([
  countTrees(1, 1),
  countTrees(3, 1),
  countTrees(5, 1),
  countTrees(7, 1),
  countTrees(1, 2),
])
  .then((results) => {
    const result = results.reduce((multiplication, current) => current * multiplication, 1);
    console.log('multiplication of number of trees from different methods: ', result);
  });
