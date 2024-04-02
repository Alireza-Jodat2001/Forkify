import { controllSearchView, state } from '../model.js';
import icon from 'url:../../Images/icons.svg';
import View from './View.js';
import { RESAULT_PER_PAGE } from '../config.js';
import spinnerView from './spinnerView.js';

class searchView extends View {
  _searchField = document.querySelector('.search__field');
  _formEl = document.querySelector('.search');

  constructor(_parentEl, _errorMessage) {
    super(_parentEl, _errorMessage);
  }

  // get search input value
  _getQuery() {
    return this._searchField.value;
  }

  // add handler search method
  _addHandlerSearch() {
    this._formEl.addEventListener('submit', async e => {
      try {
        e.preventDefault();
        // 1) render spinner
        const spinnerMarkup = spinnerView._generateMarkup();
        this._render(spinnerMarkup);
        // 2) get search resaults
        const data = await controllSearchView(this._getQuery());
        if (!data[0]) throw new Error('Not found!');
        // 3) render search resaults
        const searchMarkups = this._generateMarkup(data);
        this._render(searchMarkups);
      } catch (err) {
        const errorMarkup = this._generateMarkupError();
        this._render(errorMarkup);
      }
    });
  }

  // generate markup
  _generateMarkup(results) {
    const markups = results.map(result => {
      const { title, publisher, image_url, id } = result;
      return `
        <li class="preview">
          <a class="preview__link" href="#${id}">
            <figure class="preview__fig">
              <img src="${image_url}" alt="${title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${title}</h4>
              <p class="preview__publisher">${publisher}</p>
            </div>
          </a>
        </li>
      `;
    });
    return markups.join('');
  }

  // get result per page
  _getResultPage(page = 1) {
    const allResult = state.search.result,
      start = (page - 1) * RESAULT_PER_PAGE,
      end = page * RESAULT_PER_PAGE;
    return allResult.slice(start, end);
  }
}

export default new searchView(
  document.querySelector('.results'), // parentEl
  'No recipes found for your query! please try again!' // errorMessage
);
