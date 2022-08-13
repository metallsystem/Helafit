/* eslint-disable no-param-reassign */
import prettify from "../helpers/prettifyNumbers";

const lang = document.querySelector('html').getAttribute('lang');
const checkout = document.querySelector('.checkout');
let textData = {};

if (!checkout) {
  localStorage.removeItem('productsArr')
}

if (lang === 'ukr') {
  textData = {
    price: 'Ціна',
    count: 'Кількість',
    total: 'Сума',
    order: 'Ваше замовлення',
    title: 'Разом',
    sum: ' на суму:',
    delivery: 'Вартість доставки:',
    delivPrice: 'за тарифами перевізника',
    toPay: 'До сплати',
    submit: 'Підтвердити замовлення'
  }
} else {
  textData = {
    price: 'Цена',
    count: 'Количество',
    total: 'Сумма',
    order: 'Ваш заказ',
    title: 'Итого',
    sum: ' на сумму:',
    delivery: 'Стоимость доставки:',
    delivPrice: 'по тарифам перевозчика',
    toPay: 'К оплате',
    submit: 'Подтвердить заказ'
  }
}

const formData = {
  contacts: {
    name: '',
    surname: '',
    phone: '',
    city: ''
  },
  order: {},
  delivery: {},
  pay: {},
  recipient: {}
}

let totalPrice = 0;

function renderData(data) {

  const items = data.map(item => {
      totalPrice += item.cost * item.count
      formData.order[item.name] = item
      formData.order.totalPrice = totalPrice

      return `
        <li class="order__item">
          <div class="order__box">
            <img class="order__image" src="${item.src}" alt="${item.alt}">
            <span class="order__name helafit">${item.alt}</span>
          </div>
          <ul class="order__box">
            <li class="order__option">
              <span class="order__option-title">${textData.price}</span>
              <span class="order__option-content">${item.cost} грн/л</span>
            </li>
            <li class="order__option">
              <span class="order__option-title">${textData.count}</span>
              <span class="order__option-content">${prettify(item.count)} л</span>
            </li>
            <li class="order__option">
              <span class="order__option-title">${textData.total}</span>
              <span class="order__option-content">${prettify(item.cost * item.count)} грн</span>
            </li>
          </ul>
        </li>
      `
  });

  return `
    <div class="form__top">
      <h2 class="order__title">${textData.order}</h2>
      <span>На сумму: ${prettify(totalPrice)} грн.</span>
    </div>
    <ul class="order">
      ${items.join('')}
    </ul>
  `
}

function renderSidebar(data) {
  let text

  if (data.length === 1) {
    text = '1 товар'
  } else {
    text = `${data.length} товара`
  }

  return `
    <p class="sidebar__title">${textData.title}</p>
    <div class="sidebar__wrapper">
      <span class="sidebar__text">${text}${textData.sum}</span>
      <span class="sidebar__price">${prettify(totalPrice)} грн</span>
    </div>
    <div class="sidebar__wrapper">
      <span class="sidebar__text">${textData.delivery}</span>
      <span class="sidebar__price">${textData.delivPrice}</span>
    </div>
    <div class="sidebar__wrapper">
      <span class="sidebar__text">${textData.toPay}</span>
      <span class="sidebar__total-price">${prettify(totalPrice)} грн</span>
    </div>
    <button class="sidebar__btn button form__btn" type="submit">${textData.submit}</button>
  `
}

class OrderForm {
  constructor(shopData, parrentSelector, sidebarSelector) {
    this.data = shopData.filter(item => item !== false)
    this.el = document.getElementById(parrentSelector)
    this.sideEl = document.querySelector(sidebarSelector)
    this.orderForm = document.forms['checkout-form']
    this.form = document.querySelector('.checkout__form')

    this.#render()

    this.radioBtn = document.querySelectorAll('.form__radio')
    this.checkedRadio = []

    this.#setup()
  }

  #render() {
    this.el.insertAdjacentHTML('beforeEnd', renderData(this.data))
    this.sideEl.insertAdjacentHTML('beforeEnd', renderSidebar(this.data))
  }

  #setup() {
    this.radioBtn.forEach(el => {
      this.radioInputHandler = this.radioInputHandler.bind(this)
      el.addEventListener('click', this.radioInputHandler)

      if (!el.parentNode.lastElementChild.classList.contains('form__grid')) {
       el.nextElementSibling.style.marginBottom = 0
       el.parentNode.style.paddingBottom = '16px'
      } else if (!el.checked) {
        el.parentElement.querySelectorAll('.form__input').forEach(item => {
          item.disabled = true
        });
      }

      if (el.checked) {
        this.checkedRadio.push(el)
      }
    })

    this.submitEvent = this.submitEvent.bind(this)
    this.orderForm.addEventListener('submit', this.submitEvent)
  }

  radioInputHandler(e) {

    this.checkedRadio.forEach(el => {
      if (el.name === e.target.name) {
        el.parentElement.classList.remove('checked')
        el.parentElement.querySelectorAll('.form__input').forEach(item => {
          item.disabled = true
        })
        this.checkedRadio = this.checkedRadio.filter(radio => radio.name !== e.target.name)
      }
    })

    e.target.parentElement.classList.add('checked')
    e.target.parentElement.querySelectorAll('.form__input').forEach(item => {
      item.disabled = false
    })
    this.checkedRadio.push(e.target)
  }

  submitEvent(e) {
    e.preventDefault()

    const items = this.data.map(item => `${item.alt}:%0A
      Количество: ${prettify(item.count)}л%0A
      Цена: ${item.cost}грн/л%0A
      Сумма: ${prettify(item.cost * item.count)}грн%0A`);

    let text = `Получен новый заказ%0A%0AКонтактные данные:%0AИмя: ${ this.orderForm[1].value}%0AФамилия: ${ this.orderForm[2].value}%0AТелефон: ${ this.orderForm[3].value}%0AГород: ${ this.orderForm[4].value}%0A%0AТовар на сумму ${prettify(totalPrice)}грн:%0A${items.join('')}
    `

    this.checkedRadio.forEach(item => {
      const fieldset = item.closest('.form__fieldset')
      const legend = fieldset.firstElementChild.innerText
      const radioLabels = item.labels[0].innerText
      const inputs = item.parentElement.querySelectorAll('.form__input')

      text += `%0A${legend}:%0A  ${radioLabels}:%0A`

      if (inputs.length) {
        inputs.forEach(input => {
          const inpuValue = input.value
          const inputLabel = input.labels[0].innerText

          if (inpuValue) {
            text += `    ${inputLabel}: ${inpuValue}%0A`
          }
        })
      }
    })

    // eslint-disable-next-line no-return-assign
    return fetch(`https://api.telegram.org/bot1909199365:AAGlwzTGW5iApTJhjqORN7gQuUcT3dfkk-E/sendMessage?chat_id=-1001589242772&parse_mode=html&text=${text}`, {
      method: 'POST'
    })
    .then(response => response.json())
    .then(localStorage.removeItem('productsArr'))
    // .then(window.location.href = 'index.html')
  }
}

export default () => {
  let shopData = localStorage.getItem('productsArr')

  if (!shopData) {
    return
  }

  shopData = JSON.parse(shopData)

  // eslint-disable-next-line no-unused-vars
  const order = new OrderForm(shopData, 'order', '.sidebar')
}
