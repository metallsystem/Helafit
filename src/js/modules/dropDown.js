export default (seeds, kombi, organik) => {
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
}
