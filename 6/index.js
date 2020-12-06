const readline = require('readline');
const fs = require('fs');

const getGroupAnswers = (group) => {
  return group.split('').filter((value, index, array) => array.indexOf(value) === index);
};

const getGroupAnswersForAll = (group) => {
  const answers = group.split(',').filter(a => !!a);
  const answersMap = {};
  answers.forEach((a)=> {
    a.split('').forEach((answer) => {
      answersMap[answer] = answersMap[answer] ? answersMap[answer] + 1 : 1;
    });
  });

  return Object.keys(answersMap).filter((a) => answersMap[a] === answers.length);
};

const getAllGroupsAnswers = async () => {
  const readInterface = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    output: process.stdout,
    console: false,
  });

  const answers = [];
  let currentGroup = '';

  for await (const line of readInterface) {
    if (line === '') {
      answers.push(getGroupAnswersForAll(currentGroup));
      currentGroup = '';
    } else {
      currentGroup = `${currentGroup},${line}`
    }
  }

  return answers;
};

getAllGroupsAnswers()
  .then((answers) => {
    const numberOfAnswers = answers.map((g) => g.length);
    console.log('numberOfAnswers: ', numberOfAnswers);
    const sum = numberOfAnswers.reduce((sum, current) => current + sum, 0);
    console.log('sum: ', sum);
  });
