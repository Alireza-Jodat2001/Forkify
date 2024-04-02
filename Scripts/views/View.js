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

  // render error method
  _generateMarkupError(errIcon = 'alert-triangle') {
    return `
      <div class="error">
        <div>
          <svg>
            <use href="${icon}#icon-${errIcon}"></use>
          </svg>
        </div>
        <p>${this._errorMessage}</p>
      </div>
    `;
  }

  // update method
  _update(newState) {
    const newMarkup = this._generateMarkup(newState);
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newEl = Array.from(newDOM.querySelectorAll('*'));
    const currEl = Array.from(this._parentEl.querySelectorAll('*'));
    newEl.forEach((newEl, i) => {
      const currentEl = currEl[i];
      //  compairation the Elements
      if (!newEl.isEqualNode(currentEl)) {
        // changing the text content
        if (currentEl.firstChild?.nodeValue.trim() !== '')
          currentEl.textContent = newEl.textContent;
        // changing the attribute
        Array.from(newEl.attributes).forEach(attribute =>
          currentEl.setAttribute(attribute.name, attribute.value)
        );
      }
    });
  }

  // clear container
  _clearContainer(parentEl) {
    parentEl.innerHTML = '';
  }

  // insert HTML function
  _insertHTML(markup, parentEl) {
    parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
