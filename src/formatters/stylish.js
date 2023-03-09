import _ from 'lodash';

const stepIndent = 4; // задаем шаг для отступов в 4 пробела

const getIndent = (count) => ' '.repeat(count * stepIndent); // функция для генерации отступов заданной длины

const getValue = (node, depth) => { // функция для получения значения узла дерева
  if (!_.isObject(node)) { // если значение не является объектом (то есть примитивом)
    return node; // вернуть само значение
  }
  const bracketEndIndent = getIndent(depth - 1); // определяем отступ до закрывающей скобки объекта
  const lines = Object.entries(node).map(([key, value]) => `${getIndent(depth)}${key}: ${getValue(value, depth + 1)}`); // обрабатываем каждую пару ключ-значение объекта

  return [
    '{',
    ...lines, // добавляем обработанные строки в массив
    `${bracketEndIndent}}`, // закрываем объект и добавляем отступ
  ].join('\n'); // преобразуем массив в строку и разделяем строки переносами
};

const stylish = (tree) => { // функция преобразования дерева в строку в стиле "stylish"
  const iter = (data, depth = 1) => { // функция-итератор, обходящая дерево
    // задаем отступ для каждой строки, обрезая 2 пробела в конце, что соответствует смещению влево
    const indent = getIndent(depth).slice(0, getIndent(depth) - 2);
    // определяем отступ до закрывающей скобки объекта
    const bracketEndIndent = getIndent(depth - 1);

    const lines = data.flatMap((diff) => { // обрабатываем каждый узел дерева
      switch (diff.type) { // проверяем тип узла
        case 'nested': // если узел является вложенным объектом
          return `${indent}  ${diff.key}: ${iter(diff.children, depth + 1)}`; // рекурсивно вызываем функцию обработки вложенного объекта
        case 'added': // если значение добавлено
          return `${indent}+ ${diff.key}: ${getValue(diff.value2, depth + 1)}`; // добавляем отступ и получаем значение
        case 'deleted': // если значение удалено
          return `${indent}- ${diff.key}: ${getValue(diff.value1, depth + 1)}`; // добавляем отступ и получаем значение
        case 'unchanged': // если значение не изменилось
          return `${indent}  ${diff.key}: ${getValue(diff.value1, depth + 1)}`; // добавляем отступ и получаем значение
        case 'changed': // если значение изменилось
          return [
            `${indent}- ${diff.key}: ${getValue(diff.value1, depth + 1)}`, // добавляем отступ и получаем старое значение
            `${indent}+ ${diff.key}: ${getValue(diff.value2, depth + 1)}`, // добавляем отступ и получаем новое значение
          ];
        default: // выбрасываем ошибку если тип не известен
          throw new Error(`Unknown type of data: ${diff.type}`);
      }
    });

    return [
      '{',
      ...lines,
      `${bracketEndIndent}}`,
    ].join('\n');
  };
  return iter(tree);
};

export default stylish;
