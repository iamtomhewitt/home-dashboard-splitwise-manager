// Combines coverage reports
const fs = require('fs');

const reports = ['/coverage.txt'];
let coverages = 0;

const run = async () => {
  await reports.forEach(async (report) => {
    const contents = await fs.readFileSync(process.cwd() + report, 'utf-8');
    contents.split('\n').forEach((line) => {
      if (line.startsWith('All files')) {
        const coverage = line.split('|')[1].trim();
        coverages += parseFloat(coverage);
      }
    });
  });

  const finalCoverage = parseFloat(coverages / reports.length).toFixed(2);
  console.log(finalCoverage);
};

run();

return coverages;
