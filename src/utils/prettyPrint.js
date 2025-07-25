import Table from 'cli-table3';
import chalk from 'chalk';

export const prettyPrint = (headers, data) => {
  const table = new Table({
    head: headers,
    colWidths: [15, 20, 18],
    colAligns: ['center', 'left', 'right'],
    style: {
      head: ['green', 'bold'],
      border: ['blue'],
    },
  });
  if (data.length === 0) {
    console.log(
      chalk.yellowBright('Warning: ') +
        'No processes found matching your criteria.'
    );
  } else {
    data.forEach(process =>
      table.push([process.protocol, process.port, process.pid])
    );
    console.log(table.toString());
  }
};
