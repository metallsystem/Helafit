/* eslint-disable no-param-reassign */
const getBtnTemplate = () => `
  <div class="popup__actions">
  <div class="popup__menu">
    <button class="popup__btn change-size" type="button">
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
    <button class="popup__btn close-popup" type="button" data-type="close">
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
  `

export default class Popup {
  constructor(popupSelector, openSelector, options) {
    this.parentEl = document.querySelectorAll(popupSelector)
    this.openEl = document.querySelectorAll(openSelector)

    this.#renderButtons()
    this.#setData()
    this.#setup()
  }

  #renderButtons() {
    this.parentEl.forEach(el => {
      el.querySelector('.popup__content').insertAdjacentHTML('afterBegin', getBtnTemplate())
    })
  }

  #setData() {
    this.parentEl.forEach((element, index) => {
      element.dataset.type = 'popup'
      element.dataset.id = index
    })
    this.openEl.forEach((element, index) => {
      element.dataset.type = 'open'
      element.dataset.id = index
    })
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this)
    this.parentEl.forEach(item => {
      item.addEventListener('click', this.clickHandler)
    })
    this.openEl.forEach(item => {
      item.addEventListener('click', this.clickHandler)
    })
  }

  clickHandler(event) {
    const { type, id } = event.target.dataset

    if (type === 'open') {
      this.open(id)
    } else if (type === 'close') {
      this.close()
    }
  }

  open(id) {
    this.parentEl.forEach(el => {
      if (el.dataset.id === id) {
        el.classList.add('popup--open')
      }
    })
  }

  close() {
    this.parentEl.forEach(el => {
      el.classList.remove('popup--open')
    })
  }

  destroy() {
    this.parentEl.forEach(item => {
      item.removeEventListener('click', this.clickHandler)
    })
    this.openEl.forEach(item => {
      item.removeEventListener('click', this.clickHandler)
    })
  }
}
