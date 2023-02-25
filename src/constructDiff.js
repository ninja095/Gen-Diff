import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  const diff = keys.map((key) => {
    let result;
    const value1 = data1[key];
    const value2 = data2[key];
    if (_.isObject(value1) && _.isObject(value2)) {
      result = { key, children: buildDiff(value1, value2), type: 'nested' };
    } else if (!Object.hasOwn(data1, key)) {
      result = { key, value2, type: 'added' };
    } else if (!Object.hasOwn(data2, key)) {
      result = { key, value1, type: 'deleted' };
    } else if (value1 !== value2) {
      result = {
        key, value1, value2, type: 'changed',
      };
    } else {
      result = { key, value1, type: 'unchanged' };
    }
    return result;
  });
  return diff;
};

export default buildDiff;
