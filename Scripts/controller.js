import * as model from './model.js';
import { recipeContainer } from './config.js';
import { renderSpinner } from './helpers.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// re rendering of page without refresh with help the parcel library
if (module.hot) module.hot.accept();

// show recipes function
async function showRecipes() {
   try {
      // getting id of food that on the window object
      const id = window.location.hash.slice(1);
      if (!id) return;
      // render spinner
      renderSpinner(recipeContainer);
      // send request with id on the window
      await model.sendRequest(id);
      // render recipe
      recipeView.render(model.state.recipe);
   } catch (err) {
      console.log(err.message);
   }
}

// events about hash on the window and load page
['load', 'hashchange'].forEach(typeEevent =>
   window.addEventListener(typeEevent, showRecipes)
);

// const timeout = function (s) {
//    return new Promise(function (_, reject) {
//       setTimeout(function () {
//          reject(new Error(`Request took too long! Timeout after ${s} second`));
//       }, s * 1000);
//    });
// };
