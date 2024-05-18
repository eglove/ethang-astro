let curNum = BigInt(0);
/**
 * @type {Record<string, bigint>}
 */
let memoFib = {};

self.onmessage = onMessage;

function onMessage() {
  getNextFib();
}

function getNextFib() {
  const curFib = fib(curNum);
  self.postMessage({ num: curNum, fib: curFib });
  curNum++;
  setTimeout(getNextFib, 0);
}

/**
 * @param {bigint} n
 */
function fib(n) {
  if (n < BigInt(2)) {
    return n;
  }

  if (!memoFib[n.toString()]) {
    memoFib[n.toString()] = fib(n - BigInt(1)) + fib(n - BigInt(2));
  }

  return memoFib[n.toString()];
}
