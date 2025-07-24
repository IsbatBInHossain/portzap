import Table from 'cli-table3';

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
  data.forEach(process =>
    table.push([process.protocol, process.port, process.pid])
  );
  console.log(table.toString());
};
