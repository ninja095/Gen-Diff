import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import { expect, test } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filepath) => readFileSync(getFixturePath(filepath), 'utf-8').trim();

test('genDiff - stylish format with JSON files', () => {
  const file1 = 'file1.json';
  const file2 = 'file2.json';
  const format = 'stylish';
  const actual = genDiff(getFixturePath(file1), getFixturePath(file2), format);
  const expected = readFile('expected_stylish.txt');
  expect(actual).toBe(expected);
});

test('genDiff - stylish format with YAML files', () => {
  const file1 = 'file1.yml';
  const file2 = 'file2.yml';
  const format = 'stylish';
  const actual = genDiff(getFixturePath(file1), getFixturePath(file2), format);
  const expected = readFile('expected_stylish.txt');
  expect(actual).toBe(expected);
});

test('genDiff - plain format with JSON files', () => {
  const file1 = 'file1.json';
  const file2 = 'file2.json';
  const format = 'plain';
  const actual = genDiff(getFixturePath(file1), getFixturePath(file2), format);
  const expected = readFile('expected_plain.txt');
  expect(actual).toBe(expected);
});

test('genDiff - plain format with YAML files', () => {
  const file1 = 'file1.yml';
  const file2 = 'file2.yml';
  const format = 'plain';
  const actual = genDiff(getFixturePath(file1), getFixturePath(file2), format);
  const expected = readFile('expected_plain.txt');
  expect(actual).toBe(expected);
});

test('genDiff - json format with JSON files', () => {
  const file1 = 'file1.json';
  const file2 = 'file2.json';
  const format = 'json';
  const actual = genDiff(getFixturePath(file1), getFixturePath(file2), format);
  const expected = readFile('expected_json.txt');
  expect(actual).toBe(expected);
});

test('genDiff - json format with YAML files', () => {
  const file1 = 'file1.yml';
  const file2 = 'file2.yml';
  const format = 'json';
  const actual = genDiff(getFixturePath(file1), getFixturePath(file2), format);
  const expected = readFile('expected_json.txt');
  expect(actual).toBe(expected);
});

