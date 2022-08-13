import prettify from "../helpers/prettifyNumbers";
import dropDown from "./dropDown";
import { disableButton, enableButton } from '../helpers/buttonBlock'
/* eslint-disable no-use-before-define */
export default () => {

const prod = document.querySelectorAll('.card');

if (!prod.length) {
  return;
};

const cardOptions = {
  '0': [],
  '1': [],
  '2': [],
};

for (let i = 0; i < prod.length; i += 1) {
  cardOptions[i].plusBtn = prod[i].querySelector('.card__plus');
  cardOptions[i].input = prod[i].querySelector('.card__input');
  cardOptions[i].minusBtn = prod[i].querySelector('.card__minus');
  cardOptions[i].sum = prod[i].querySelector('.card__sum');
  cardOptions[i].imgSrc = prod[i].querySelector('.card__image').getAttribute('src');
  cardOptions[i].imgAlt = prod[i].querySelector('.card__image').getAttribute('alt');
};

class Product {
  constructor(name, cost, id, options) {
    this.id = id;
    this.name = name;
    this.cost = cost;
    this.count = 0;
    this.minusBtn = options.minusBtn;
    this.plusBtn = options.plusBtn;
    this.input = options.input;
    this.sum = options.sum;
    this.imgAlt = options.imgAlt;
    this.imgSrc = options.imgSrc;
    this.totalText = document.querySelector('.store__total');
    this.total = 0;

    this.#init()
  }

  #init() {
    this.plusBtnEvent();
    this.minusBtnEvent();
    this.counterInputValidate();
  };

  clear() {
    this.count = 0;
    this.isValid()
  }

  totalSum() {
    const sum = seeds.total + kombi.total + organik.total
    this.totalText.innerHTML = prettify(sum);
  };

  calcSum() {
    this.sum.innerHTML = prettify(this.cost * this.count);
    this.total = this.cost * this.count;
  };

  plusBtnEvent () {
    this.plusBtn.addEventListener('click', () => {
      this.plus();
      this.isValid()
    })
  };

  plus() {
    this.count += 10;
  };

  minusBtnEvent () {
    this.minusBtn.addEventListener('click', () => {
      this.minus();
      this.isValid()
    })
  };

  minus() {
    this.count -= 10;
  };

  getOrderData() {
    if (this.count === 0) {
      return false
    }

    this.productsToBuy = {
      name: this.name,
      cost: this.cost,
      count: this.count,
      alt: this.imgAlt,
      src: this.imgSrc
    }

    this.clear()

    return this.productsToBuy
  }

  counterInputValidate() {
    this.input.addEventListener('input', () => {
      this.input.value = this.input.value.replace(/[^\d]/g, '');
    });

    this.input.addEventListener('change', () => {
      this.count = Math.ceil(parseInt(this.input.value, 10)/10)*10;
      this.isValid()
    });
  }

  isValid() {
    if (this.count === 0 || this.input.value === '') {
      this.count = 0;
      disableButton(this.minusBtn)
      enableButton(this.plusBtn)
    }
    else if (this.count >= 100000) {
      this.count = 100000;
      disableButton(this.plusBtn)
      enableButton(this.minusBtn)
    } else {
      enableButton(this.minusBtn)
      enableButton(this.plusBtn)
    }

    this.input.value = this.count;
    this.calcSum();
    this.totalSum();
  }

};

  const seeds = new Product('seeds', 350, 2, cardOptions[0]);

  const kombi = new Product('kombi', 270, 1, cardOptions[1]);

  const organik = new Product('organik', 270, 3, cardOptions[2]);

  dropDown(seeds, kombi, organik)

  const submit = document.querySelector('.store__btn')

  submit.addEventListener('click', (e) => {
    if (!seeds.total && !organik.total && !kombi.total) {
      e.preventDefault()
    } else {
      productsDataArr()
    }
  })

  function productsDataArr() {
    const buyArr = [seeds.getOrderData(), kombi.getOrderData(), organik.getOrderData()]

    localStorage.setItem('productsArr', JSON.stringify(buyArr))
  }
};
