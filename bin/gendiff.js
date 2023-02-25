#!/usr/bin/env node
import { Command } from 'commander';
import path from 'path';
import genDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .helpOption('-h, --help', 'output usage information')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const fullPath1 = path.resolve(process.cwd(), '__fixtures__', filepath1);
    const fullPath2 = path.resolve(process.cwd(), '__fixtures__', filepath2);
    console.log(genDiff(fullPath1, fullPath2, program.opts().format));
  });

program.parse();
