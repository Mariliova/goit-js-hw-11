export default class PageInterface {
  reset(element) {
    element.innerHTML = '';
  }

  hide(element) {
    element.classList.add('visually-hidden');
  }

  show(element) {
    element.classList.remove('visually-hidden');
  }
}
