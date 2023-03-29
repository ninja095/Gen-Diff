const stringify = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  return value;
};

const formatPlain = (tree) => {
  const generateDiffLines = (data, path = '') => {
    const lines = data.map((node) => {
      const keyPath = path === '' ? `${node.key}` : `${path}.${node.key}`;

      switch (node.type) {
        case 'nested':
          return generateDiffLines(node.value, keyPath);
        case 'added':
          return `Property '${keyPath}' was added with value: ${stringify(node.value)}`;
        case 'deleted':
          return `Property '${keyPath}' was removed`;
        case 'changed':
          return `Property '${keyPath}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
        case 'unchanged':
          return null;
        default:
          throw new Error(`Unknown type of diff: ${node.type}`);
      }
    });

    return lines.filter(Boolean).join('\n');
  };
  return generateDiffLines(tree);
};

export default formatPlain;
