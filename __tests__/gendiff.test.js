import { expect, test } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import parse from '../src/parsers.js'; // eslint-disable-line
import constructDiff from '../src/constructDiff.js'; // eslint-disable-line

const __filename = fileURLToPath(import.meta.url); // eslint-disable-line
const __dirname = dirname(__filename); // eslint-disable-line

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

test('when we compare two files .json ', () => {
  const content1 = parse(readFile('file1.json'), 'json');
  const content2 = parse(readFile('file2.json'), 'json');
  const expectedResult = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__', 'stringJson.txt'), 'utf8').trim();

  const compareRes = constructDiff(content1, content2);

  expect(compareRes).toBe(expectedResult);
});

test('when we compare two files .yml', () => {
  const content1 = parse(readFile('file1.yml'), 'yml');
  const content2 = parse(readFile('file2.yml'), 'yml');
  const expectedResult = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__', 'stringJson.txt'), 'utf8').trim();

  const compareRes = constructDiff(content1, content2);

  expect(compareRes).toBe(expectedResult);
});
