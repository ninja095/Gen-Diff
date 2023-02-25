import _ from 'lodash';

const constructDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  const diff = keys.map((key) => {
    let result;
    switch (true) {
      case (_.isObject(data1[key]) && _.isObject(data2[key])):
        result = { key, children: constructDiff(data1[key], data2[key]), type: 'nested' };
        break;
      case (!Object.hasOwn(data1, key)):
        result = { key, value2: data2[key], type: 'added' };
        break;
      case (!Object.hasOwn(data2, key)):
        result = { key, value1: data1[key], type: 'deleted' };
        break;
      case (data1[key] !== data2[key]):
        result = {
          key, value1: data1[key], value2: data2[key], type: 'changed',
        };
        break;
      default:
        result = { key, value1: data1[key], type: 'unchanged' };
        break;
    }
    return result;
  });

  return diff;
};

export default constructDiff;
