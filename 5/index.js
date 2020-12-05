const readline = require('readline');
const fs = require('fs');

const getSeatId = (seatSpecification) => {
  let maxRow = 127;
  let minRow = 0;
  let row;
  let column;
  let maxColumn = 7;
  let minColumn = 0;

  const rows = seatSpecification.split('').slice(0, 7);
  const columns = seatSpecification.split('').slice(7);

  for (const split of rows) {
    if (split === 'F') {
      maxRow = Math.floor((maxRow - minRow) / 2 + minRow);
    } else {
      minRow = Math.ceil(maxRow - (maxRow - minRow) / 2);
    }
  }

  row = minRow;

  for (const split of columns) {
    if (split === 'L') {
      maxColumn = Math.floor((maxColumn - minColumn) / 2 + minColumn);
    } else {
      minColumn = Math.ceil(maxColumn - (maxColumn - minColumn) / 2);
    }
  }

  column = minColumn;

  return 8 * row + column;
};

const getAllSeatsId = async () => {
  const readInterface = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    output: process.stdout,
    console: false,
  });

  const seats = [];

  for await (const line of readInterface) {
    const seatId = getSeatId(line);
    seats.push(seatId);
  }

  return seats;
};

getAllSeatsId()
  .then((seats) => {
    console.log('max: ', Math.max(...seats));
    const sortedSeats = seats.sort((a, b) => b - a);
    let missingSeat = 0;

    for (let i = 0; i < sortedSeats.length - 1; i++) {
      if (sortedSeats[i] - sortedSeats[i + 1] === 2) {
        missingSeat = sortedSeats[i] - 1;
        break;
      }
    }
    console.log('seat: ', missingSeat);
  });
