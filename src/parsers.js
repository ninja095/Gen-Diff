import yaml from 'js-yaml';

export default (data, format) => {
  if (format === 'json') {
    return JSON.parse(data);
  } else if (format === 'yml' || format === 'yaml') {
    return yaml.load(data);
  }
  throw new Error(`Unknown type of format: ${format}`);
};
