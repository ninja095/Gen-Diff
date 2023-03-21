import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filepath) => readFileSync(getFixturePath(filepath), 'utf-8').trim();

test.each([
  ['file1.json', 'file2.json', 'stylish', 'expected_stylish.txt'],
  ['file1.yml', 'file2.yml', 'stylish', 'expected_stylish.txt'],
  ['file1.json', 'file2.json', 'plain', 'expected_plain.txt'],
  ['file1.yml', 'file2.yml', 'plain', 'expected_plain.txt'],
  ['file1.json', 'file2.json', 'json', 'expected_json.txt'],
  ['file1.yml', 'file2.yml', 'json', 'expected_json.txt'],
])('genDiff-tests(%#)', (file1, file2, format, expectedFile) => {
  const actual = genDiff(getFixturePath(file1), getFixturePath(file2), format);
  const expected = readFile(expectedFile); expect(actual).toBe(expected);
});
