import _ from 'lodash';

const stepIndent = 4;
const replacer = ' ';
const doubleSpacer = '  ';

const getIndent = (count) => replacer.repeat(count * stepIndent - 2);

const stringify = (node, depth) => {
  if (!_.isObject(node)) {
    return node;
  }
  const lines = Object.entries(node).map(([key, value]) => `${getIndent(depth +1 )}${doubleSpacer}${key}: ${stringify(value, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${getIndent(depth)}  }`,
  ].join('\n');
};

  const formatStylish = (data, depth = 1) => {
    const lines = data.flatMap((diff) => {
      switch (diff.type) {
        case 'nested':
          return `${getIndent(depth)}  ${diff.key}: {\n${formatStylish(diff.children, depth + 1).join('\n')}\n${getIndent(depth)}${doubleSpacer}}`;
        case 'added':
          return `${getIndent(depth)}+ ${diff.key}: ${stringify(diff.value2, depth)}`;
        case 'deleted':
          return `${getIndent(depth)}- ${diff.key}: ${stringify(diff.value1, depth)}`;
        case 'unchanged':
          return `${getIndent(depth)}  ${diff.key}: ${stringify(diff.value1, depth)}`;
        case 'changed':
          return [
            `${getIndent(depth)}- ${diff.key}: ${stringify(diff.value1, depth)}`,
            `${getIndent(depth)}+ ${diff.key}: ${stringify(diff.value2, depth)}`,
          ];
        default:
          throw new Error(`Unknown type of data: ${diff.type}`);
      }
    });
    return lines
  };

export default (tree) => `{\n${formatStylish(tree).join('\n')}\n}`;
