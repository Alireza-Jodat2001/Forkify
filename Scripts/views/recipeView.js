import icon from 'url:../../Images/icons.svg';
import { Fraction } from 'fractional';
import View from './View.js';
import { state } from '../model.js';

class RecipeView extends View {
  #data;

  constructor(parentEl, errorMessage) {
    super(parentEl, errorMessage);
  }

  // store data and call createMarkap function
  _render(data) {
    this.#data = data;
    const id = window.location.hash.slice(1);
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    const recipeStrEl = this._createMarkap(this.#data);
    this._clearContainer();
    this._insertHTML(recipeStrEl);
    //  init event click btns
    this._initBtnClick();
  }

  // re render Servings
  _reRenderServings() {
    const newRecipeMarkup = this._createMarkap(state.recipe);
    const newDOM = document
      .createRange()
      .createContextualFragment(newRecipeMarkup);
    const newRecipeEl = Array.from(newDOM.querySelectorAll('*'));
    const currRecipeEl = Array.from(this._getParentEl().querySelectorAll('*'));
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

  // event click handler bnts
  _initBtnClick() {
    document
      .querySelector('.recipe__info-buttons')
      .addEventListener('click', e => {
        const oldServings = state.recipe.servings;
        if (e.target.closest('.btn--minus-servings')) --state.recipe.servings;
        else ++state.recipe.servings;
        //  updating recipe servings
        this._updateQuantity(oldServings, state.recipe.servings);
        // re render Servings
        this._reRenderServings();
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
    ['load', 'hashchange'].forEach(typeEevent =>
      window.addEventListener(typeEevent, showRecipes)
    );
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
            <p>${this._getErrorMessage()}</p>
         </div>
   `;
    this._clearContainer();
    this._insertHTML(markup);
  }

  // create recipe element
  _createMarkap(recipe) {
    // prettier-ignore
    const { title, sourceUrl, servings, publisher, ingredients, image, id, cookingTime } = recipe;
    return `
       <figure class="recipe__fig">
          <img src="${image}" alt="${title}" class="recipe__img" />
          <h1 class="recipe__title">
          <span>${title}</span>
          </h1>
       </figure>
       <div class="recipe__details">
          <div class="recipe__info">
          <svg class="recipe__info-icon">
             <use href="${icon}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${cookingTime}</span>
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
                  href="${sourceUrl}"
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
