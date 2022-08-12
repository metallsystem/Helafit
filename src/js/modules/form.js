import shopForm from "./shopForm";

export default () => {
  const inputsArr = document.querySelectorAll('.form__input, .form__textarea');
  // const contactUsForm = document.forms['contact-us']
  const regEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const regPhone = /^\+?3?8?(0(63|66|67|68|73|93|95|96|97|98|99)\d{7})$/;

  function setErrorFor(input, message) {
    const formBox = input.parentElement;
    const small = formBox.querySelector('small');

    formBox.classList.remove('success');

    formBox.classList.add('error');

    if (!small) {
      formBox.insertAdjacentHTML('beforeEnd', `
        <small class="error-message">${message}</small>
      `);
    } else {
      small.innerText = message;
    }
  }

  function setSuccessFor(input) {
    const formBox = input.parentElement;
    const small = formBox.querySelector('small');

    if (small) {
      small.innerText = '';
    }

    formBox.classList.remove('error');

    if (input.value === '') {
      return;
    }

    formBox.classList.add('success');

  }

  function isEmail(email) {
    return regEmail.test(email);
  }

  function isPhone(phone) {
    return regPhone.test(phone);
  }

  function inputValidate (input, func, type) {
    if (input.value === '' && input.required) {
      setErrorFor(input, `Это поле обязательно для заполнения, введите Ваш ${type}`);
    } else if (!func(input.value) && input.value !== '') {
      setErrorFor(input, `Введен неверный ${type}`);
    } else {
      setSuccessFor(input);
    }
  }

  function nameCheck (input) {
    if (input.value === '' && input.required) {
      setErrorFor(input, 'Это поле обязательно для заполнения, введите Ваше имя');
    } else {
      setSuccessFor(input);
    }
  }

  function IputsCheck(input) {
    if (input.type === 'text') {
      nameCheck(input);
    } else if (input.type === 'tel') {
      inputValidate(input, isPhone, 'номер телефона');
    } else if (input.type === 'email') {
      inputValidate(input, isEmail, 'Email');
    } else if (input.type === 'textarea') {
      if (input.value !== '') {
        setSuccessFor(input)
      }
    }
  }

  function formAnimate(e) {
    e.target.value = e.target.value.trim();

    IputsCheck(e.target);

    if (e.target.value !== '') {
      e.srcElement.labels.forEach(item => item.classList.add('form__label--filled'));
    } else {
      e.srcElement.labels.forEach(item => item.classList.remove('form__label--filled'));
      e.target.parentElement.classList.remove('success');
    }
  };

  // function sendForm(e) {
  //   console.log(e);
  //   e.preventDefault();

  //   console.dir(contactUsForm.elements.email.value);
  // }

  function formEvents() {

    if (inputsArr.length === 0) {
      return;
    }

    inputsArr.forEach(item => {
      item.addEventListener('blur', formAnimate);
    });

    // contactUsForm.addEventListener('submit', sendForm);
  };

  formEvents();
};

shopForm()
