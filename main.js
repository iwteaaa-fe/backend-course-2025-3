const { program } = require('commander');
const fs = require('fs');

program
    .requiredOption('-i, --input <type>', 'Path to the input JSON file')
    .option('-o, --output <type>', 'Path to the output file')
    .option('-d, --display', 'Display result in the console');

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

let result = `(Це майбутній результат обробки файлу ${options.input})`;

if (options.output) {
    console.log(`Result will be saved to: ${options.output}`);
    // У Частині 2 тут буде fs.writeFileSync(options.output, result);
}

if (options.display) {
    console.log('Displaying result in console:');
    console.log(result);
}

console.log('Program finished.');