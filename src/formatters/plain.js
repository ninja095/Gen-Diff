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
  const lines = tree.map((node) => {
    const keyPath = path === '' ? `${node.key}` : `${path}.${node.key}`;

    switch (node.type) {
      case 'nested':
        return generateDiffLines(node.children, keyPath);
      case 'added':
        return `Property '${keyPath}' was added with value: ${stringify(node.value2)}`;
      case 'deleted':
        return `Property '${keyPath}' was removed`;
      case 'changed':
        return `Property '${keyPath}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
      case 'unchanged':
        return '';
      default:
        throw new Error(`Unknown type of diff: ${node.type}`);
    }
  });

  return lines.filter((line) => line !== '').join('\n');
};


export default (tree) => generateDiffLines(tree);
