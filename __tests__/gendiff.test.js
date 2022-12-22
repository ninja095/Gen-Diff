import { expect, test } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

test('we test genDiff function ', () => {
  const content1 = JSON.parse(readFile('file1.json'));
  const content2 = JSON.parse(readFile('file2.json'));
  const expectedResult = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__', 'stringJson.txt'), 'utf8').trim();

  const compareRes = genDiff(content1, content2);

  expect(compareRes).toBe(expectedResult);
});