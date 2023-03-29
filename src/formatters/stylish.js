import _ from 'lodash';

const stepIndent = 4;
const replacer = ' ';
const doubleSpacer = '  ';

const getIndent = (count) => replacer.repeat(count * stepIndent - 2);

const stringify = (node, depth) => {
  if (!_.isPlainObject(node)) {
    return String(node);
  }
  const lines = Object
    .entries(node)
    .map(([key, val]) => `${getIndent(depth + 1)}  ${key}: ${stringify(val, (depth + 1))}`);
  return `{\n${lines.join('\n')}\n${getIndent(depth)}${doubleSpacer}}`;
};

const formatStylish = (data, depth = 1) => {
  const lines = data.flatMap(
    ({
      type, key, value, value1, value2,
    }) => {
      switch (type) {
        case 'nested':
          return `${getIndent(depth)}  ${key}: {\n${formatStylish(value, depth + 1).join('\n')}\n${getIndent(depth)}${doubleSpacer}}`;
        case 'added':
          return `${getIndent(depth)}+ ${key}: ${stringify(value, depth)}`;
        case 'deleted':
          return `${getIndent(depth)}- ${key}: ${stringify(value, depth)}`;
        case 'unchanged':
          return `${getIndent(depth)}  ${key}: ${stringify(value, depth)}`;
        case 'changed':
          return [
            `${getIndent(depth)}- ${key}: ${stringify(value1, depth)}`,
            `${getIndent(depth)}+ ${key}: ${stringify(value2, depth)}`,
          ];
        default:
          throw new Error(`Unknown type of data: ${type}`);
      }
    },
  );
  return lines;
};

export default (tree) => `{\n${formatStylish(tree).join('\n')}\n}`;
