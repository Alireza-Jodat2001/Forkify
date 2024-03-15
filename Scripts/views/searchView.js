import { controllSearchView } from '../model.js';

class searchView {
   #searchField = document.querySelector('.search__field');
   #formEl = document.querySelector('.search');

   // get search input value
   getQuery() {
      return this.#searchField.value;
   }

   // add handler search method
   addHandlerSearch() {
      this.#formEl.addEventListener('submit', e => {
         e.preventDefault();
         controllSearchView(this.getQuery());
      });
   }
}

export default new searchView();
