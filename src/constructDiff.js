import _ from 'lodash';

const constructDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  const diff = keys.map((key) => {
    let result;
    const value1 = data1[key];
    const value2 = data2[key];

    switch (true) {
      case _.isObject(value1) && _.isObject(value2):
        result = { key, children: constructDiff(value1, value2), type: 'nested' };
        break;
      case !Object.hasOwn(data1, key):
        result = { key, value2, type: 'added' };
        break;
      case !Object.hasOwn(data2, key):
        result = { key, value1, type: 'deleted' };
        break;
      case value1 !== value2:
        result = {
          key, value1, value2, type: 'changed',
        };
        break;
      default:
        result = { key, value1, type: 'unchanged' };
    }

    return result;
  });
  return diff;
};


export default constructDiff;
