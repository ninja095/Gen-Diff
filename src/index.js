import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';
import constructDiff from './constructDiff.js';
import getDiff from './formatters/index.js';

const getData = (filepath) => readFileSync(path.resolve(`${process.cwd()}`, filepath));
const getExtension = (filepath) => path.extname(filepath).slice(1);

export default (filepath1, filepath2, format = 'stylish') => {
  const data1 = parse(getData(filepath1), getExtension(filepath1));
  const data2 = parse(getData(filepath2), getExtension(filepath2));
  return getDiff(constructDiff(data1, data2), format);
};
