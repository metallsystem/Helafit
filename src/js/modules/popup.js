import trapFocus from "./focusTrap";

const popup = document.querySelectorAll('.popup');
const popupOpenBtn = document.querySelectorAll('.open-popup');
const body = document.querySelector('body');
let returnFocus;
let popupActionBtns;

 export function bodyLock () {
  const lockPaddingValue = `${ window.innerWidth - document.querySelector('main').offsetWidth }px`;
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');
};

export function bodyUnlock () {
  setTimeout(() => {
    body.removeAttribute('style');
    body.classList.remove('lock');
  }, 300);
}

export default() => {

  function actionButtonsAdd (item) {
    let disabled = 'disabled';

    if (document.querySelector('.popup__img')) {
      disabled = '';
    }

    item.children[0].insertAdjacentHTML('afterBegin', `
    <div class="popup__actions">
    <div class="popup__menu">
      <button class="popup__btn change-size" type="button" ${disabled}>
      <svg width="20" height="20">
        <use xlink:href="images/sprites/sprite-mono.svg#search-plus"></use>
      </svg>
        <svg width="20" height="20">
          <use xlink:href="images/sprites/sprite-mono.svg#search-minus"></use>
        </svg>
        <span class="sr-only">Увеличить/Уменьшить</span>
      </button>
      <button class="popup__btn full-size" type="button">
        <svg width="20" height="20">
          <use xlink:href="images/sprites/sprite-mono.svg#expand"></use>
        </svg>
        <svg width="20" height="20">
          <use xlink:href="images/sprites/sprite-mono.svg#compress"></use>
        </svg>
        <span class="sr-only">Во весь экран</span>
      </button>
      <button class="popup__btn close-popup" type="button">
        <svg width="20" height="20">
          <use xlink:href="images/sprites/sprite-mono.svg#close"></use>
        </svg>
        <span class="sr-only">Закрыть</span>
      </button>
    </div>
    <button class="popup__btn left" type="button">
      <svg width="20" height="20">
        <use xlink:href="images/sprites/sprite-mono.svg#chevron-left"></use>
      </svg>
    <span class="sr-only">Влево</span></button>
    <button class="popup__btn right" type="button">
      <svg width="20" height="20">
        <use xlink:href="images/sprites/sprite-mono.svg#chevron-right"></use>
      </svg>
      <span class="sr-only">Вправо</span></button>
  </div>
    `)

    popupActionBtns = document.querySelector('.popup__actions');
  }

  function closePopup () {

      popup.forEach(item => {
        item.classList.remove('popup--open');

        if (item.children[0].firstElementChild === popupActionBtns) {
          item.children[0].removeChild(popupActionBtns)
        }
      });

      bodyUnlock();

      returnFocus.focus();
  };

  function d (item) {
    const content = item.querySelector('.popup__content');

    returnFocus = document.getElementById(`${item.classList[1]}`);
    returnFocus.blur();

    actionButtonsAdd(item);

    trapFocus(item, 'popup--open');

    content.scrollTop = 0;
    item.classList.add('popup--open');

    bodyLock();
  }

  function openPopup(e) {
    e.preventDefault();

    popup.forEach(item => {
      if (item.classList.contains(e.target.id)) {
        d(item);
      }
    })
  };

function previousPopup() {
  const parent = document.querySelector('.popup--open');

  closePopup()

  setTimeout(() => {
    if (parent.previousElementSibling === null) {
      d(popup[popup.length - 1])
    } else if (!parent.previousElementSibling.classList.contains('popup')) {
      d(popup[popup.length - 1])
    } else {
      d(parent.previousElementSibling)
    }
  }, 300)
}

function nextPopup() {
  const parent = document.querySelector('.popup--open');

  closePopup()

  setTimeout(() => {
    if (parent.nextElementSibling) {
      d(parent.nextElementSibling)
    } else {
      d(popup[0])
    }
  }, 300)
}

function fullScreen(e) {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    e.target.children[0].style.display = 'none';
    e.target.children[1].style.display = 'inline-block';
} else if (document.exitFullscreen) {
    document.exitFullscreen();
    e.target.children[1].style.display = 'none';
    e.target.children[0].style.display = 'inline-block';
  }
}

function zoomInOut(e) {
  const parent = document.querySelector('.popup--open').querySelector('.popup__img');

  if (!parent) {
    e.target.setAttribute('disabled', 'disabled')
    return;
  }

  e.target.children[0].removeAttribute('disabled')

  if (parent.style.height === 'auto') {
    parent.style.height = '80vh';
    e.target.children[1].style.display = 'none';
    e.target.children[0].style.display = 'inline-block';
  } else {
    parent.style.height = 'auto';
    e.target.children[0].style.display = 'none';
    e.target.children[1].style.display = 'inline-block';
  }
}

function clickListener (e) {
  const elClass = e.target.classList;
  if (elClass.contains('close-popup')) {
    const parent = document.querySelector('.popup--open').querySelector('.popup__img');

    closePopup()

    if (document.fullscreenElement) {
      document.exitFullscreen();
    }

    if (parent) {
      parent.removeAttribute('style');
    }
  } else if (elClass.contains('left')) {
    previousPopup();
  } else if (elClass.contains('right')) {
    nextPopup();
  } else if (elClass.contains('full-size')) {
    fullScreen(e);
  } else if (elClass.contains('change-size')) {
    zoomInOut(e);
  }
}

  document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
      const parent = document.querySelector('.popup--open').querySelector('.popup__img');

      closePopup(e)

      if (parent.style.height === 'auto') {
        parent.style.height = '80vh';
      }
    } else if (e.key === 'ArrowLeft') {
      previousPopup(e);
    } else if (e.key === 'ArrowRight') {
      nextPopup(e);
    }
  });

  for (let i = 0; i < popup.length; i += 1) {
    popup[i].classList.add(`popup-${i}`)
    popup[i].addEventListener('click', clickListener)
  }

  for (let i = 0; i < popupOpenBtn.length; i += 1) {
    popupOpenBtn[i].setAttribute('id', `popup-${i}`)
    popupOpenBtn[i].addEventListener('click', openPopup)
  }
}
