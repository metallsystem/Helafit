const body = document.querySelector('body');

export function scrollLock () {
  const lockPaddingValue = `${ window.innerWidth - document.querySelector('main').offsetWidth }px`;
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');
};

export function scrollUnlock () {
  setTimeout(() => {
    body.removeAttribute('style');
    body.classList.remove('lock');
  }, 300);
};
