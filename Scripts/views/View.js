import icon from 'url:../../Images/icons.svg';

export default class View {
  #parentEl;
  #errorMessage;

  constructor(parentEl, errorMessage) {
    this.#parentEl = parentEl;
    this.#errorMessage = errorMessage;
  }

  // clear container
  _clearContainer() {
    this.#parentEl.innerHTML = '';
  }

  // insert HTML function
  _insertHTML(strEl) {
    this.#parentEl.insertAdjacentHTML('afterbegin', strEl);
  }

  // render spinner function
  _renderSpinner() {
    const spinnerStrEl = `
      <div class="spinner">
        <svg>
          <use href="${icon}#icon-loader"></use>
        </svg>
      </div>
    `;
    // 1) clear container
    this._clearContainer();
    // 2) insert in container
    this._insertHTML(spinnerStrEl);
  }

  // get error message method
  _getErrorMessage() {
    return this.#errorMessage;
  }

  _getParentEl() {
    return this.#parentEl;
  }

  // generate Markup ingredient
  _createMarkupIngredient(ingredient) {
    const { unit, quantity, description } = ingredient;
    return `
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icon}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          quantity ? new Fraction(quantity) : ''
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit">${unit}</span>
          ${description}
        </div>
      </li>
    `;
  }
}
