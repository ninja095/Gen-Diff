import genDiff from "../src/gendiff.js";
import { expect, test } from '@jest/globals';
import path from 'path';
import { readFileSync } from 'fs';

test('we test genDiff function ', () => {
    // arrange
    const file1 = path.resolve(process.cwd(), "__fixtures__", 'file1.json');
    const file2 = path.resolve(process.cwd(), "__fixtures__", 'file2.json');

    // act
    const result = '{\n' +
        '- follow: false\n' +
        '  host: hexlet.io\n' +
        '- proxy: 123.234.53.22\n' +
        '- timeout: 50\n' +
        '+ timeout: 20\n' +
        '+ verbose: true\n' +
        '}\n'
    // assert
    expect(genDiff(file1, file2)).toBe(result)
})