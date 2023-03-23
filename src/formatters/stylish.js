import _ from 'lodash';

const getIndent = (count, stepIndent = 4) => ' '.repeat(count * stepIndent - 2);

const getValue = (node, depth) => {
  if (!_.isObject(node)) {
    return node;
  }
  const lines = Object.entries(node).map(([key, value]) => `${getIndent(depth)}${key}: ${getValue(value, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${getIndent(depth)}}`,
  ].join('\n');
};

const formatStylish = (tree) => {
  const iter = (data, depth = 1) => {
    const indent = getIndent(depth);
    const lines = data.flatMap((diff) => {
      switch (diff.type) {
        case 'nested':
          return `${indent}  ${diff.key}: ${iter(diff.children, depth + 1)}`;
        case 'added':
          return `${indent}+ ${diff.key}: ${getValue(diff.value2, depth + 1)}`;
        case 'deleted':
          return `${indent}- ${diff.key}: ${getValue(diff.value1, depth + 1)}`;
        case 'unchanged':
          return `${indent}  ${diff.key}: ${getValue(diff.value1, depth + 1)}`;
        case 'changed':
          return [
            `${indent}- ${diff.key}: ${getValue(diff.value1, depth + 1)}`,
            `${indent}+ ${diff.key}: ${getValue(diff.value2, depth + 1)}`,
          ];
        default:
          throw new Error(`Unknown type of data: ${diff.type}`);
      }
    });

    return [
      '{',
      ...lines,
      `${getIndent(depth)}}`,
    ].join('\n');
  };
  return iter(tree);
};

export default formatStylish;
