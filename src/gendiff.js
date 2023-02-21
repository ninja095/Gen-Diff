import _ from 'lodash';

const genDiff = (file1, file2) => {
  const keys = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));
  const result = keys.map((key) => {
    if (!_.has(file2, key)) {
      return `- ${key}: ${file1[key]}`;
    } else if (!_.has(file1, key)) {
      return `+ ${key}: ${file2[key]}`;
    } else if (_.isEqual(file1[key], file2[key])) {
      return `  ${key}: ${file1[key]}`;
    } else {
      return `- ${key}: ${file1[key]}\n+ ${key}: ${file2[key]}`;
    }
  }).join('\n');
  return `{\n${result}\n}`;
};

export default genDiff;
