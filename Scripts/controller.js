import * as model from './model.js';
import { recipeContainer } from './config.js';
import View from './views/View.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';
import spinnerView from './views/spinnerView.js';
import { getWindowHash } from './helpers.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';

// re rendering of page without refresh with help the parcel library
// if (module.hot) module.hot.accept();

// show recipes function
async function showRecipes() {
  try {
    // 1) getting id of food that on the window object
    const id = getWindowHash();
    if (!id) return;
    // 2) render spinner
    const spinnerMarkup = spinnerView._generateMarkup();
    recipeView._render(spinnerMarkup);
    // 3) send request with id on the window
    await model.sendRequest(id);
    // 4) checking bookmarked
    if (model.state.bookmarks.some(bookmark => bookmark.id === id))
      model.state.recipe.bookmarked = true;
    // 5) render recipe
    const recipeMarkup = recipeView._generateMarkup(model.state.recipe);
    recipeView._render(recipeMarkup);
  } catch (err) {
    recipeView._renderError();
    console.error(err);
  }
}

// all Events
(() => {
  recipeView._addHandlerEvent(showRecipes);
  searchView._addHandlerSearch();
  paginationView._addEventHandler();
  bookmarkView._addHandlerEvent();
})();
