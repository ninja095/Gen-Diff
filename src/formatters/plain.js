const stringify = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  return value;
};

const generateDiffLines = (tree, path = '') => {
  const lines = [];
  tree.forEach((node) => {
    const keyPath = path === '' ? `${node.key}` : `${path}.${node.key}`;

    switch (node.type) {
      case 'nested':
        lines.push(generateDiffLines(node.children, keyPath));
        break;
      case 'added':
        lines.push(`Property '${keyPath}' was added with value: ${stringify(node.value2)}`);
        break;
      case 'deleted':
        lines.push(`Property '${keyPath}' was removed`);
        break;
      case 'changed':
        lines.push(`Property '${keyPath}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`);
        break;
      case 'unchanged':
        break;
      default:
        throw new Error(`Unknown type of diff: ${node.type}`);
    }
  });

  return lines.filter((line) => line !== '').join('\n');
};

export default (tree) => generateDiffLines(tree);
