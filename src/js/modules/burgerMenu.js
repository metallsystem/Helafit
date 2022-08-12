import { scrollLock, scrollUnlock } from '../helpers/scrollLock';
import trapFocus from './focusTrap';

export default class BurgerMenu {
  constructor(menuSelector, btnSelector) {
    this.btn = document.querySelector(btnSelector)
    this.menu = document.querySelector(menuSelector)

    this.#setup()
  }

  #setup() {
    if (this.btn) {
      this.clickHandler = this.clickHandler.bind(this)
      this.btn.addEventListener('click', this.clickHandler)
    }
  }

  open() {
    this.menu.classList.add('open')
    window.scrollTo(0, 0)
    document.querySelector('.menu__list').scrollTop = 0
    trapFocus(this.menu, 'open', '.burger-menu')
    scrollLock()
    this.btn.style.backgroundImage = 'url(images/close.svg)'
  }

  close() {
    this.menu.classList.remove('open')
    scrollUnlock()
    this.btn.focus()
    this.btn.style.backgroundImage = 'url(images/burger.svg)'
  }

  toggle() {
    if (this.menu.classList.contains('open')) {
      this.close()
    } else {
      this.open()
    }
  }

  clickHandler(event) {
    if (event.target === this.btn) {
      this.toggle()
    }
  }
}
