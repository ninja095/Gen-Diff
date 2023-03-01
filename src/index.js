import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';
import constructDiff from './constructDiff.js';
import getDiff from './formatters/index.js';

const getData = (filepath) => readFileSync(path.resolve(`${process.cwd()}`, filepath));
const getExtension = (filepath) => path.extname(filepath).slice(1);

export default (filepath1, filepath2, format = 'stylish') => {
  const fullPath1 = path.resolve(process.cwd(), '__fixtures__', filepath1);
  const fullPath2 = path.resolve(process.cwd(), '__fixtures__', filepath2);
  const data1 = parse(getData(fullPath1), getExtension(filepath1));
  const data2 = parse(getData(fullPath2), getExtension(filepath2));
  return getDiff(constructDiff(data1, data2), format);
};
