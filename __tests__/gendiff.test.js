import genDiff from "../src/gendiff.js";
import { expect, test } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import {log} from "debug";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

test('we test genDiff function ', () => {
    // arrange
    // const fullPath1 = path.resolve(process.cwd(), "__fixtures__", 'file1.json');
    // const fullPath2 = path.resolve(process.cwd(), "__fixtures__", 'file2.json');
    // const data1 = fs.readFileSync(fullPath1, 'utf8');
    // const data2 = fs.readFileSync(fullPath2, 'utf8');
    const content1 = JSON.parse(readFile('file1.json'));
    const content2 = JSON.parse(readFile('file2.json'));
    const expectedResult = fs.readFileSync(path.resolve(process.cwd(), "__fixtures__", 'stringJson.txt'), 'utf8').trim();

    // act
    const compareRes = genDiff(content1, content2);

    // assert
    expect(compareRes).toBe(expectedResult)
})