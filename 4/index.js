const readline = require('readline');
const fs = require('fs');

const generateRequiredCurrentPassport = () => {
  return {
    byr: null,
    iyr: null,
    eyr: null,
    hgt: null,
    hcl: null,
    ecl: null,
    pid: null,
  };
};

const validatePassport = (passport) => {
  const areAllProvided = Object.values(passport).filter((value) => value === null).length === 0;

  if (!areAllProvided) {
    return false;
  }

  const isHeightValid = (height) => {
    const measure = height.slice(-2);
    const value = height.slice(0, -2);

    if (!['cm', 'in'].includes(measure) || !areAllDigits(value)) {
      return false;
    }

    return (measure === 'cm' && value <= 193 && value >= 150)
      || (measure === 'in' && value <= 76 && value >= 59);
  };

  const areAllDigits = (value) => new RegExp('^\\d*$', 'g').test(value);

  const validation = {
    byr: areAllDigits(passport.byr) && passport.byr <= 2002 && passport.byr >= 1920,
    iyr: areAllDigits(passport.iyr) && passport.iyr <= 2020 && passport.iyr >= 2010,
    eyr: areAllDigits(passport.eyr) && passport.eyr <= 2030 && passport.eyr >= 2020,
    hgt: isHeightValid(passport.hgt),
    hcl: new RegExp('^#([0-9]|[a-f]){6}$', 'g').test(passport.hcl),
    ecl: ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(passport.ecl),
    pid: areAllDigits(passport.pid) && passport.pid.length === 9,
  };

  return Object.values(validation).every((valid) => valid === true);
};

const countValidPassports = async () => {
  const readInterface = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    output: process.stdout,
    console: false,
  });

  let numberOfValidPassports = 0;
  let numberOfPassports = 0;
  let currentPassport = generateRequiredCurrentPassport();

  for await (const line of readInterface) {
    if (!line) {
      if (validatePassport(currentPassport)) {
        numberOfValidPassports++;
      }

      numberOfPassports++;
      currentPassport = generateRequiredCurrentPassport();
      continue;
    }

    const fields = line.split(' ');

    fields.forEach((field) => {
      const fieldType = field.split(':')[0];
      currentPassport[fieldType] = field.split(':')[1];
    });
  }

  return [numberOfValidPassports, numberOfPassports];
};

countValidPassports()
  .then(([numberOfValidPassports, numberOfPassports]) => {
    console.log('numberOfValidPassports: ', numberOfValidPassports);
    console.log('numberOfPassports: ', numberOfPassports);
  });
