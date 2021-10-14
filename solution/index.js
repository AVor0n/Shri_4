module.exports = function (Homework) {
  function increment(i) {
    return new Promise(function (resolve) {
      Homework.add(i, 1, function (result) {
        resolve(result);
      });
    });
  }
  function less(a, b) {
    return new Promise(function (resolve) {
      Homework.less(a, b, function (result) {
        resolve(result);
      });
    });
  }
  function getEl(func, i) {
    return new Promise(function (resolve) {
      func(i, function (result) {
        resolve(result);
      });
    });
  }
  function call(func, [acc, cur, i, array]) {
    return new Promise(function (resolve) {
      func(acc, cur, i, array, function (result) {
        resolve(result);
      });
    });
  }

  return async (array, fn, initialValue, cb) => {
    let acc;
    const length = await new Promise((resolve) =>
      array.length((result) => resolve(result))
    );

    if (initialValue !== undefined && length === 0) {
      acc = initialValue;
    }
    if (initialValue === undefined && length === 1) {
      acc = await getEl(array.get, 0);
    }

    if (acc !== undefined) {
      cb(acc);
    } else {
      if (initialValue !== undefined) {
        const firstEl = await getEl(array.get, 0);
        acc = await call(fn, [initialValue, firstEl, 0, array]);
      } else {
        acc = await getEl(array.get, 0);
      }

      for (let i = 1; await less(i, length); i = await increment(i)) {
        const cur = await getEl(array.get, i);
        acc = await call(fn, [acc, cur, i, array]);
      }

      cb(acc);
    }
  };
};
