import * as model from './model.js';
import { recipeContainer } from './config.js';
import View from './views/View.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';

// re rendering of page without refresh with help the parcel library
if (module.hot) module.hot.accept();

// show recipes function
async function showRecipes() {
  try {
    // getting id of food that on the window object
    const id = window.location.hash.slice(1);
    if (!id) return;
    // render spinner
    recipeView._renderSpinner();
    // send request with id on the window
    await model.sendRequest(id);
    // render recipe
    recipeView._render(model.state.recipe);
  } catch (err) {
    //  recipeView._renderError();
    console.error(err);
  }
}

// events about hash on the window and load page
(() => {
  recipeView._addHandlerEvent(showRecipes);
  searchView._addHandlerSearch();
})();
