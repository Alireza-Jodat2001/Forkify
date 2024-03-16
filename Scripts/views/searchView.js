import { controllSearchView, state } from '../model.js';
import icon from 'url:../../Images/icons.svg';
import View from './View.js';

class searchView extends View {
  #searchField = document.querySelector('.search__field');
  #formEl = document.querySelector('.search');

  constructor(parentEl, errorMessage) {
    super(parentEl, errorMessage);
  }

  // get search input value
  _getQuery() {
    return this.#searchField.value;
  }

  // clear search input
  _clearInput() {
    this.#searchField.value = '';
  }

  // add handler search method
  _addHandlerSearch() {
    this.#formEl.addEventListener('submit', async e => {
      try {
        e.preventDefault();
        this._renderSpinner();
        const data = await controllSearchView(this._getQuery());
        if (!data.results) throw new Error('Not found!');
        this._clearInput();
        this._clearContainer();
        this._render(state.search.result);
      } catch (err) {
        this._renderError();
      }
    });
  }

  // render search result
  _render(results) {
    results.map(result => {
      const { title, publisher, image_url: image, id } = result;
      const markup = `
         <li class="preview preview__link--active">
            <a class="preview__link" href="#${id}">
            <figure class="preview__fig">
               <img src="${image}" alt="${title}" />
            </figure>
            <div class="preview__data">
               <h4 class="preview__title">${title}</h4>
               <p class="preview__publisher">${publisher}</p>
            </div>
            </a>
         </li>
      `;
      this._insertHTML(markup);
    });
  }

  // render error
  _renderError() {
    const markup = `
        <div class="error">
           <div>
              <svg>
                 <use href="${icon}#icon-alert-triangle"></use>
              </svg>
           </div>
           <p>${this._getErrorMessage()}</p>
        </div>
   `;
    this._clearContainer();
    this._insertHTML(markup);
  }
}

export default new searchView(
  document.querySelector('.results'), // parentEl
  'No recipes found for your query! please try again!' // errorMessage
);
