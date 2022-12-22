import genDiff from "../src/gendiff.js";
import { expect, test } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

test('we test genDiff function ', () => {
    // arrange
    const file1 = JSON.parse(path.resolve(process.cwd(), "__fixtures__", 'file1.json'));
    const file2 = JSON.parse(path.resolve(process.cwd(), "__fixtures__", 'file2.json'));
    const expectedResult = '{\n' +
        '- follow: false\n' +
        '  host: hexlet.io\n' +
        '- proxy: 123.234.53.22\n' +
        '- timeout: 50\n' +
        '+ timeout: 20\n' +
        '+ verbose: true\n' +
        '}\n'

    // act
    const compareRes = genDiff(file1, file2);
    // assert
    expect(compareRes).toBe(expectedResult)
})