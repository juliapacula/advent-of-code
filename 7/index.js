const readline = require('readline');
const fs = require('fs');

const findColorsContaining = (color, bags) => {
  const foundColors = bags.filter((c) => c.children.some((child) => child.color.includes(color)));

  return [...foundColors, ...foundColors.map((c) => findColorsContaining(c.parentColor, bags)).flat()]
    .filter((value, index, array) => array.indexOf(value) === index);
};

const findNumberOfPossibleBags = (color, bags) => {
  const foundBag = bags.find((c) => c.parentColor.includes(color));

  if (foundBag.children.length === 0) {
    return 1;
  }

  return foundBag.children.reduce((sum, child) => {
    return sum + parseInt(child.number, 10) * findNumberOfPossibleBags(child.color, bags);
  }, 1);
};

const getAllGroupsAnswers = async (bagToContain) => {
  const readInterface = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    output: process.stdout,
    console: false,
  });

  const colors = [];
  const NO_BAGS = 'no other';

  for await (const line of readInterface) {
    const definedColor = line.split(' bags contain ')[0];
    const availableColors = line.split(' bags contain ')[1]
      .replace('.', '')
      .replace(' bags', '')
      .split(', ');

    colors.push({
      parentColor: definedColor,
      children: availableColors
        .filter((color) => color !== NO_BAGS)
        .map((color) => ({
          number: color.split(' ')[0],
          color: color.split(' ')[1] + ' ' + color.split(' ')[2],
        })),
    });
  }

  return [findColorsContaining(bagToContain, colors), findNumberOfPossibleBags(bagToContain, colors)];
};


getAllGroupsAnswers('shiny gold')
  .then(([colors, numberOfBags]) => {
    console.log('colors: ', colors.length);
    console.log('numberOfBags: ', numberOfBags - 1);
  });
