import _ from 'lodash';

const constructDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  return keys.map((key) => {
    switch (true) {
      case _.isObject(data1[key]) && _.isObject(data2[key]):
        return { key, children: constructDiff(data1[key], data2[key]), type: 'nested' };
      case !Object.hasOwn(data1, key):
        return { key, value2: data2[key], type: 'added' };
      case !Object.hasOwn(data2, key):
        return { key, value1: data1[key], type: 'deleted' };
      case _.isEqual(data1[key], data2[key]):
        return { key, value1: data1[key], value2: data2[key], type: 'changed' };
      default:
        return { key, value1: data1[key], type: 'unchanged' };
    }
  });
};



export default constructDiff;
