const { getPasswords } = require('./passwords');

getPasswords().then((passwords) => {
  const validPasswords = [];

  for (const passwordAndPolicy of passwords) {
    const letter = passwordAndPolicy.letter;
    const found = passwordAndPolicy.password.match(new RegExp(letter, 'g'));

    if (found !== null) {
      const numberOfOccurrences = found.length;

      if (numberOfOccurrences <= passwordAndPolicy.maxOccurrences && numberOfOccurrences >= passwordAndPolicy.minOccurrences) {
        validPasswords.push(passwordAndPolicy);
      }
    }
  }

  console.log('validPasswords.length: ', validPasswords.length);

  const newPolicyValidPasswords = [];

  for (const passwordAndPolicy of passwords) {
    const firstPosition = passwordAndPolicy.minOccurrences;
    const secondPosition = passwordAndPolicy.maxOccurrences;
    const letter = passwordAndPolicy.letter;
    const password = passwordAndPolicy.password;
    const firstPositionLetter = password.substr(firstPosition - 1, 1);
    const secondPositionLetter = password.substr(secondPosition - 1, 1);

    if (
      (firstPositionLetter === letter && secondPositionLetter !== letter)
      || (firstPositionLetter !== letter && secondPositionLetter === letter)) {
      newPolicyValidPasswords.push(passwordAndPolicy);
    }
  }

  console.log('newPolicyValidPasswords.length: ', newPolicyValidPasswords.length);
});
