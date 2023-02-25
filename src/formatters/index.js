import stylish from './stylish.js';
import plain from './plain.js';

export default (data, format) => {
  if (format === 'stylish') {
    return stylish(data);
  } if (format === 'plain') {
    return plain(data);
  } if (format === 'json') {
    return JSON.stringify(data);
  }
  throw new Error(`Unknown type of format: ${format}`);
};
