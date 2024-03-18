import { resultPerPage } from '../config';
import { state } from '../model';
import icon from 'url:../../Images/icons.svg';
import View from './View.js';
import searchView from './searchView';

class paginationView extends View {
  constructor(parentEl) {
    super(parentEl);
    // set click event for pagination button
    this._addEventHandler();
  }
  // event handler
  _addEventHandler() {
    this._getParentEl().addEventListener('click', e => {
      const { target } = e;
      if (!target.closest('.btn--inline')) return;
      if (target.closest('.pagination__btn--next')) ++state.search.currPage;
      else --state.search.currPage;
      // render pagination btn
      this._render();
      // render next or prev page
      const data = searchView._getResultPage(state.search.currPage);
      searchView._render(data);
    });
  }
  // render pagination btn
  _render() {
    this._clearContainer();
    const markup = this._generateMarkupBtn();
    this._insertHTML(markup);
  }
  // generate markup
  _generateMarkupBtn() {
    const allPages = Math.ceil(state.search.result.length / resultPerPage),
      currPage = state.search.currPage;
    // first page
    if (currPage === 1 && currPage < allPages) {
      return `
        <button class="btn--inline pagination__btn--next">
          <span>Page ${currPage + 1}</span>
          <svg class="search__icon">
            <use href="${icon}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }
    // other page
    else if (currPage < allPages) {
      return `
        <button class="btn--inline pagination__btn--next">
          <span>Page ${currPage + 1}</span>
          <svg class="search__icon">
            <use href="${icon}#icon-arrow-right"></use>
          </svg>
        </button>
        <button class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icon}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currPage - 1}</span>
        </button>
      `;
    }
    // last page
    else if (currPage === allPages) {
      return `
        <button class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icon}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currPage - 1}</span>
        </button>
      `;
    }
    // first page, not exist another page
    return '';
  }
}

export default new paginationView(document.querySelector('.pagination'));
