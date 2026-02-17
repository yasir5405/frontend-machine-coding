const promisifiedSetTimeout = (delay, fn) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      fn();
      resolve();
    }, delay);
  });
};

const callback = () => {
  console.log("2 seconds have passed.");
};

promisifiedSetTimeout(2000, callback).then(() => {
  console.log("Promise resolved after timeout.");
});
