/* eslint-disable no-use-before-define */
export default () => {

const prod = document.querySelectorAll('.card');

if (prod.length === 0) {
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
};

class Product {
  constructor(name, cost, options) {
    this.name = name;
    this.cost = cost;
    this.count = 0;
    this.minusBtn = options.minusBtn;
    this.plusBtn = options.plusBtn;
    this.input = options.input;
    this.sum = options.sum;
    this.totalText = document.querySelector('.store__total');
    this.total = 0;
    this.productsToBuy = {
      [this.name]: {
        cost: [this.cost],
        count: [this.count]}
    };
  }

  init() {
    this.plusBtnEvent();
    this.minusBtnEvent();
    this.inputValidate();
  };

  clear() {
    this.input.value = 0;
    this.count = 0;
    this.calcSum();
    this.totalSum();
    this.minusBtn.setAttribute('disabled', 'disabled');
    this.plusBtn.removeAttribute('disabled');
  }

  // eslint-disable-next-line class-methods-use-this
  prettify(num) {
    const n = num.toString();
    return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1 ');
  }

  totalSum() {
    const sum = seeds.total + kombi.total + organik.total
    this.totalText.innerHTML = this.prettify(sum);
  };

  calcSum() {
    this.sum.innerHTML = this.prettify(this.cost * this.count);
    this.total = this.cost * this.count;
  };

  plusBtnEvent () {
    this.plusBtn.addEventListener('click', () => {
      this.plus();
      this.calcSum();
      this.totalSum();
    })
  };

  plus() {
    if (this.input.value === '0') {
      this.count += 10;
      this.input.value = this.count;
      this.minusBtn.removeAttribute('disabled');
    } else if (this.input.value > '0' && this.input.value < '99990') {
      this.count += 10;
      this.input.value = this.count;
    } else if (this.input.value === '99990') {
      this.count += 10;
      this.input.value = this.count;
      this.plusBtn.setAttribute('disabled', 'disabled');
    }
  };

  minusBtnEvent () {
    this.minusBtn.addEventListener('click', () => {
      this.minus();
      this.calcSum();
      this.totalSum();
    })
  };

  minus() {
    if (this.input.value > 10 && this.input.value <= 99990) {
      this.count -= 10;
      this.input.value = this.count;
    } else if (this.input.value > 0 && this.input.value <= 10) {
      this.count -= 10;
      this.input.value = this.count;
      this.minusBtn.setAttribute('disabled', 'disabled');
    } else if (this.input.value === '100000') {
      this.count -= 10;
      this.input.value = this.count;
      this.plusBtn.removeAttribute('disabled');
    }
  };

  inputValidate() {
    this.input.addEventListener('input', () => {
      this.input.value = this.input.value.replace(/[^\d]/g, '');
    });

    this.input.addEventListener('change', () => {

      if (parseInt(this.input.value, 10) === 0) {
        this.count = 0;
        this.calcSum();
        this.totalSum();
        this.minusBtn.setAttribute('disabled', 'disabled');
        this.plusBtn.removeAttribute('disabled');
      }
      else if (parseInt(this.input.value, 10) > 100000) {
        this.count = 100000;
        this.input.value = this.count;
        this.calcSum();
        this.totalSum();
        this.plusBtn.setAttribute('disabled', 'disabled');
        this.minusBtn.removeAttribute('disabled');
      } else if (this.input.value === '') {
        this.count = 0;
        this.input.value = this.count;
        this.calcSum();
        this.totalSum();
        this.minusBtn.setAttribute('disabled', 'disabled');
        this.plusBtn.removeAttribute('disabled');
      } else {
        this.count = Math.ceil(parseInt(this.input.value, 10)/10)*10;
        this.input.value = this.count;
        this.calcSum();
        this.totalSum();
        this.minusBtn.removeAttribute('disabled');
        this.plusBtn.removeAttribute('disabled');
      }
    });
  }

};

const seeds = new Product('seeds', 350, cardOptions[0]);

const kombi = new Product('kombi', 270, cardOptions[1]);

const organik = new Product('organik', 270, cardOptions[2]);

seeds.init();
kombi.init();
organik.init();


const submit = document.querySelector('.store__btn')

function submitEvent() {

  submit.addEventListener('click', () => {
    productsDataArr();
  })
}

function productsDataArr() {
  const buyArr = [seeds.productsToBuy, kombi.productsToBuy, organik.productsToBuy]

  localStorage.setItem('productsArr', JSON.stringify(buyArr))
}

submitEvent();

const dropDown = document.querySelectorAll('.drop-down');

  if (dropDown.length === 0) {
    return;
  }

  function dropDownClose() {
    document.querySelector('.drop-down__open--active').classList.remove('drop-down__open--active');
  }

  function dropDownOpen(e) {
    e.target.classList.add('drop-down__open--active');
  }

  document.addEventListener('click', e => {
    const card = e.target.closest('.card');

    if (e.target.classList.contains('clear')) {
      dropDownClose();

      if (card.id === 'seeds') {
        seeds.clear()
      } else if (card.id === 'kombi') {
        kombi.clear()
      } else {
        organik.clear()
      }
    } else if (e.target.classList.contains('drop-down__open')) {
      dropDownOpen(e);
    } else if (document.querySelector('.drop-down__open--active')) {
      dropDownClose();
    }
  })

};
