import { resultPerPage } from '../config';
import { state } from '../model';

class paginationView {
  #parentEl;

  constructor(parentEl) {
    this.#parentEl = parentEl;
  }

  // check state page
  _checkStatePage() {
    const allPages = Math.ceil(state.search.result.length / resultPerPage);
    // first page
    console.log(allPages);
  }
}

export default new paginationView(document.querySelector('.pagination'));
