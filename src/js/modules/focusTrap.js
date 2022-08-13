export default function trapFocus(element, openClass, otherElement) {
  let focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');

  focusableEls = Array.from(focusableEls)

  if (otherElement) {
    const morefocusableEl = document.querySelector(otherElement)

    focusableEls.push(morefocusableEl)
  }
  const firstFocusableEl = focusableEls[0];
  const lastFocusableEl = focusableEls[focusableEls.length - 1];
  const KEYCODE_TAB = 9;
  let currentFocusableEl = -1;

  function focusAction(e) {
    const isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);

    if (!element.classList.contains(openClass)) {
      document.removeEventListener('keydown', focusAction);
    }

    if (!isTabPressed || focusableEls.length === 0) {
      e.preventDefault()
    } else if (isTabPressed && !e.shiftKey) {
      e.preventDefault();
      if (focusableEls[currentFocusableEl] === lastFocusableEl) {
        currentFocusableEl = 0;
        firstFocusableEl.focus();
      } else {
        currentFocusableEl += 1;
        focusableEls[currentFocusableEl].focus();
      }
    } else if (isTabPressed && e.shiftKey) {
      e.preventDefault();
      if (focusableEls[currentFocusableEl] === firstFocusableEl) {
        currentFocusableEl = focusableEls.length - 1;
        lastFocusableEl.focus();
      } else {
        currentFocusableEl -= 1;
        focusableEls[currentFocusableEl].focus();
      }
    }
  }

  document.addEventListener('keydown', focusAction);
}
