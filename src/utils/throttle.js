export function throttle(func, wait) {
  let timeout = null;
  let lastArgs = null;
  let lastContext = null;

  const later = () => {
    func.apply(lastContext, lastArgs);
    timeout = null;
  };

  return function (...args) {
    lastArgs = args;
    lastContext = this;
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
  };
}
