require('./Homework');
let reduse = require('./solution')(Homework);

let result;
let reducePromise = (array, func, initValue) => {
  array = new Homework.AsyncArray(array);
  fn = (acc, curr, i, src, cb) => Homework[func](acc, curr, cb);
  return new Promise((resolve) =>
    reduse(array, fn, initValue, (result) => resolve(result))
  );
};

test('Test initial value', async () => {
  result = await reducePromise([0], 'add', 0);
  expect(result).toBe(0);

  result = await reducePromise([0], 'add', 1);
  expect(result).toBe(1);

  result = await reducePromise([0], 'add', -1);
  expect(result).toBe(-1);

  result = await reducePromise([0], 'add', 25);
  expect(result).toBe(25);

  result = await reducePromise([0], 'add', -25);
  expect(result).toBe(-25);
});

test('Test array', async () => {
  result = await reducePromise([0], 'add', 0);
  expect(result).toBe(0);

  result = await reducePromise([], 'add', 0);
  expect(result).toBe(0);

  result = await reducePromise([1], 'add', 0);
  expect(result).toBe(1);

  result = await reducePromise([-1], 'add', 0);
  expect(result).toBe(-1);

  result = await reducePromise([42], 'add', 0);
  expect(result).toBe(42);

  result = await reducePromise([-15], 'add', 0);
  expect(result).toBe(-15);

  result = await reducePromise([1, 2, 3, 4], 'add', 0);
  expect(result).toBe(10);

  result = await reducePromise([-1, -2, -3, -4], 'add', 0);
  expect(result).toBe(-10);

  result = await reducePromise([1, -2, 3, -4], 'add', 0);
  expect(result).toBe(-2);

  result = await reducePromise([5, -5, 6, -6], 'add', 0);
  expect(result).toBe(0);
});

test('Test divide', async () => {
  result = await reducePromise([20, 10, 5], 'divide', 100);
  expect(result).toBe(0.1);

  result = await reducePromise([20, 10, 0], 'divide', 100);
  expect(result).toBe(Infinity);

  result = await reducePromise([20, 10, 5], 'divide', 0);
  expect(result).toBe(0);

  result = await reducePromise([20, 10, 5], 'divide', undefined);
  expect(result).toBe(0.4);

  result = await reducePromise([20, 10, 5], 'divide', null); //TODO
  expect(result).toBe(0);

  result = await reducePromise([20, 10, 5], 'divide', false); //TODO
  expect(result).toBe(0);
});

test('Test multiply', async () => {
  result = await reducePromise([2, 10, 5], 'multiply', 1);
  expect(result).toBe(100);

  result = await reducePromise([2, 10, 5], 'multiply', 10);
  expect(result).toBe(1000);

  result = await reducePromise([2, 10, 5], 'multiply', 0);
  expect(result).toBe(0);

  result = await reducePromise([2, 10, 0], 'multiply', 1);
  expect(result).toBe(0);

  result = await reducePromise([2, 10, 5], 'multiply', undefined);
  expect(result).toBe(100);

  result = await reducePromise([20, 10, 5], 'multiply', null); //TODO
  expect(result).toBe(0);

  result = await reducePromise([20, 10, 5], 'multiply', false); //TODO
  expect(result).toBe(0);
});

test('Test subtract', async () => {
  result = await reducePromise([2, 10, 5], 'subtract', 17);
  expect(result).toBe(0);

  result = await reducePromise([2, 10, 5], 'subtract', 10);
  expect(result).toBe(-7);

  result = await reducePromise([2, 10, 5], 'subtract', 0);
  expect(result).toBe(-17);

  result = await reducePromise([-2, -10, 0], 'subtract', -1);
  expect(result).toBe(11);

  result = await reducePromise([2, 10, 5], 'subtract', undefined);
  expect(result).toBe(-13);

  result = await reducePromise([20, 10, 5], 'subtract', null); //TODO
  expect(result).toBe(-35);

  result = await reducePromise([20, 10, 5], 'subtract', false); //TODO
  expect(result).toBe(-35);
});

test('Test add', async () => {
  result = await reducePromise([2, 10, 5], 'add', 1);
  expect(result).toBe(18);

  result = await reducePromise([2, 10, 5], 'add', 10);
  expect(result).toBe(27);

  result = await reducePromise([2, 10, 5], 'add', 0);
  expect(result).toBe(17);

  result = await reducePromise([2, 10, 0], 'add', 1);
  expect(result).toBe(13);

  result = await reducePromise([2, 10, 5], 'add', undefined);
  expect(result).toBe(17);

  result = await reducePromise([2, 10, 5], 'add', null);
  expect(result).toBe(17);

  result = await reducePromise([2, 10, 5], 'add', false);
  expect(result).toBe(17);
});
