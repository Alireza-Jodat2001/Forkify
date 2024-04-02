import icon from 'url:../../Images/icons.svg';

export default class View {
  constructor(parentEl, errorMessage) {
    this._parentEl = parentEl;
    this._errorMessage = errorMessage;
  }

  // render method
  _render(markup, parentEl = this._parentEl) {
    // 1) clear container
    this._clearContainer(parentEl);
    // // 2) insert in container
    this._insertHTML(markup, parentEl);
  }

  // clear container
  _clearContainer(parentEl) {
    parentEl.innerHTML = '';
  }

  // insert HTML function
  _insertHTML(markup, parentEl) {
    parentEl.insertAdjacentHTML('afterbegin', markup);
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
