const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
  input: fs.createReadStream('./input.txt'),
  output: process.stdout,
  console: false,
});


const getPasswords = async () => {
  const passwordsAndRules = [];

  for await (const line of readInterface) {
    const content = line.split(' ');
    const password = {};

    password['minOccurrences'] = content[0].split('-')[0];
    password['maxOccurrences'] = content[0].split('-')[1];
    password['letter'] = content[1][0];
    password['password'] = content[2];
    passwordsAndRules.push(password);
  }

  return passwordsAndRules;
};

module.exports = { getPasswords };
