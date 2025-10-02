const { program } = require('commander');
const fs = require('fs');

program
    .requiredOption('-i, --input <type>', 'Path to the input JSON file')
    .option('-o, --output <type>', 'Path to the output file')
    .option('-d, --display', 'Display result in the console')
    .option('-h, --humidity', 'Display humidity in the afternoon')
    .option('-r, --rainfall <value>', 'Filter by rainfall amount (show records with more than specified)');

program.parse();

const options = program.opts();

if (!options.input) {
    console.error('Error: Please, specify input file');
    process.exit(1);
}

if (!fs.existsSync(options.input)) {
    console.error('Error: Cannot find input file');
    process.exit(1);
}

console.log('Program started successfully.');
console.log('Input file:', options.input);

const fileContent = fs.readFileSync(options.input, 'utf-8');
const data = JSON.parse(fileContent);
let processedData = data;

if (options.rainfall) {
    const minRainfall = parseFloat(options.rainfall);
    processedData = processedData.filter(record => record.Rainfall >= minRainfall);
}

const resultLines = processedData.map(record => {
    const parts = [
        record.Rainfall,
        record.Pressure3pm
    ];

    if (options.humidity) {
        parts.push(record.Humidity3pm);
    }

    return parts.join(' ');
});

const outputString = resultLines.join('\n');

if (options.output) {
    fs.writeFileSync(options.output, outputString);
    console.log(`Result will be saved to: ${options.output}`);
}

if (options.display) {
    console.log('Displaying result in console:');
    console.log(outputString);
}

console.log('Program finished.');