import { RESAULT_PER_PAGE } from '../config';
import { state } from '../model';
import icon from 'url:../../Images/icons.svg';
import View from './View.js';
import searchView from './searchView';

class paginationView extends View {
  constructor(_parentEl) {
    super(_parentEl);
  }

  // event handler
  _addEventHandler() {
    this._parentEl.addEventListener('click', e => {
      const { target } = e;
      // 1) checking target
      if (!target.closest('.btn--inline')) return;
      // 2) update current page
      if (target.closest('.pagination__btn--next')) ++state.search.currPage;
      else --state.search.currPage;
      // 3) render pagination btn
      const paginationMarkupBtn = this._generateMarkup();
      this._render(paginationMarkupBtn);
      // 4) get result next or prev page
      const data = searchView._getResultPage(state.search.currPage);
      // 5) render next or prev page
      const searchMarkups = searchView._generateMarkup(data);
      searchView._render(searchMarkups);
    });
  }

  // generate markup
  _generateMarkup() {
    const allPages = Math.ceil(state.search.result.length / RESAULT_PER_PAGE);
    const currPage = state.search.currPage;
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
