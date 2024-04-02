import { state } from '../model';
import View from './View';
import recipeView from './recipeView';
import searchView from './searchView';

class bookmarkView extends View {
  constructor(_parentEl, _errorMessage) {
    super(_parentEl, _errorMessage);
  }

  // add handler event
  _addHandlerEvent() {
    recipeView._parentEl.addEventListener('click', e => {
      // 1) checking target
      if (!e.target.closest('.btn--round')) return;
      // 2) update the bookmarks array
      if (state.recipe.bookmarked) {
        state.recipe.bookmarked = false;
        state.bookmarks.pop();
      } else {
        state.recipe.bookmarked = true;
        state.bookmarks.push(state.recipe);
      }
      // 3) remove duplicate elements
      const setBookmarks = new Set(state.bookmarks);
      // 4) update bookmark button
      recipeView._reRenderServings();
      // 5) render bookmark
      const markupPreview = searchView._generateMarkup([...setBookmarks]);
      this._render(markupPreview);
    });
  }
}

export default new bookmarkView(
  document.querySelector('.bookmarks__list'), // parentEl
  'No bookmarks yet. Find a nice recipe and bookmark it :)' // errorMessage
);
