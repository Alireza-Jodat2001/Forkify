import icon from 'url:../../Images/icons.svg';
import { Fraction } from 'fractional';
import View from './View.js';
import { state } from '../model.js';
import { getWindowHash } from '../helpers.js';

class RecipeView extends View {
  constructor(_parentEl, _errorMessage) {
    super(_parentEl, _errorMessage);
  }

  // re render Servings
  _reRenderServings() {
    const newRecipeMarkup = this._generateMarkup(state.recipe);
    const newDOM = document
      .createRange()
      .createContextualFragment(newRecipeMarkup);
    const newRecipeEl = Array.from(newDOM.querySelectorAll('*'));
    const currRecipeEl = Array.from(this._parentEl.querySelectorAll('*'));
    newRecipeEl.forEach((newEl, i) => {
      const currEl = currRecipeEl[i];
      //  compairation the Elements
      if (!newEl.isEqualNode(currEl)) {
        // changing the text content
        if (currEl.firstChild?.nodeValue.trim() !== '')
          currEl.textContent = newEl.textContent;
        // changing the attribute
        Array.from(newEl.attributes).forEach(attribute =>
          currEl.setAttribute(attribute.name, attribute.value)
        );
      }
    });
  }

  // update quantity
  _updateQuantity(oldServings, newServings) {
    const { ingredients } = state.recipe;
    ingredients.forEach(ingredient => {
      ingredient.quantity = (ingredient.quantity * newServings) / oldServings;
    });
    state.recipe.servings = newServings;
  }

  // add handler event method
  _addHandlerEvent(showRecipes) {
    // onLoad and onHashChange
    ['load', 'hashchange'].forEach(typeEevent =>
      window.addEventListener(typeEevent, showRecipes)
    );
    // onClick
    this._parentEl.addEventListener('click', e => {
      const oldServings = state.recipe.servings;
      // 1) updating servings
      if (e.target.closest('.btn--minus-servings')) {
        if (oldServings === 1) return;
        --state.recipe.servings;
      } else if (e.target.closest('.btn--increase-servings'))
        ++state.recipe.servings;
      // 2)  updating recipe servings
      this._updateQuantity(oldServings, state.recipe.servings);
      // 3) re render Servings
      this._reRenderServings();
    });
  }

  // render error method
  _renderError() {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icon}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${this._errorMessage}</p>
      </div>
   `;
    // this._clearContainer();
    // this._insertHTML(markup);
  }

  // create recipe element
  _generateMarkup(recipe) {
    // prettier-ignore
    const { title, source_url, servings, publisher, ingredients, image_url,  cooking_time } = recipe;
    return `
       <figure class="recipe__fig">
          <img src="${image_url}" alt="${title}" class="recipe__img" />
          <h1 class="recipe__title">
          <span>${title}</span>
          </h1>
       </figure>
       <div class="recipe__details">
          <div class="recipe__info">
          <svg class="recipe__info-icon">
             <use href="${icon}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${cooking_time}</span>
          <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
          <svg class="recipe__info-icon">
             <use href="${icon}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${servings}</span>
          <span class="recipe__info-text">servings</span>
          <div class="recipe__info-buttons">
             <button class="btn--tiny btn--increase-servings btn--minus-servings">
                <svg>
                <use href="${icon}#icon-minus-circle"></use>
                </svg>
             </button>
             <button class="btn--tiny btn--increase-servings">
                <svg>
                <use href="${icon}#icon-plus-circle"></use>
                </svg>
             </button>
          </div>
          </div>
          <div class="recipe__user-generated">
          </div>
          <button class="btn--round">
          <svg class="">
             <use href="${icon}#icon-bookmark${
      state.recipe.bookmarked ? '-fill' : ''
    }"></use>
          </svg>
          </button>
          </div>
       <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${ingredients.map(this._createMarkupIngredient).join('')}
                  </ul>
                  </div>
                  <div class="recipe__directions">
                  <h2 class="heading--2">How to cook it</h2>
                  <p class="recipe__directions-text">
                  This recipe was carefully designed and tested by
                  <span class="recipe__publisher">${publisher}</span>. Please check out
                  directions at their website.
                  </p>
                  <a
                  class="btn--small recipe__btn"
                  href="${source_url}"
                  target="_blank"
          >
          <span>Directions</span>
          <svg class="search__icon">
             <use href="${icon}#icon-arrow-right"></use>
          </svg>
          </a>
       </div>
    `;
  }
}

export default new RecipeView(
  document.querySelector('.recipe'), // parentEl
  'We could not find that recipe, Please try again.' // errorMessage
);
