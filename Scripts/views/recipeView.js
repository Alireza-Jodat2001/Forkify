import icon from 'url:../../Images/icons.svg';
import { Fraction } from 'fractional';
import { clearContainer, insertHTML } from '../helpers.js';

class RecipeView {
   #parentEl = document.querySelector('.recipe');
   #errorMessage = 'We could not find that recipe, Please try again.';
   #data;
   // store data and call createMarkap function
   render(data) {
      this.#data = data;
      const recipeStrEl = this.#createMarkap(this.#data);
      clearContainer(this.#parentEl);
      insertHTML(this.#parentEl, recipeStrEl);
   }
   // add handler event method
   addHandlerEvent(showRecipes) {
      ['load', 'hashchange'].forEach(typeEevent =>
         window.addEventListener(typeEevent, showRecipes)
      );
   }
   // render error method
   renderError() {
      const markup = `
         <div class="error">
            <div>
               <svg>
                  <use href="src/img/${icon}#icon-alert-triangle"></use>
               </svg>
            </div>
            <p>${this.#errorMessage}</p>
         </div>
      `;
      clearContainer(this.#parentEl);
      insertHTML(this.#parentEl, markup);
   }
   // create recipe element
   #createMarkap(recipe) {
      const {
         title,
         sourceUrl,
         servings,
         publisher,
         ingredients,
         image,
         id,
         cookingTime,
      } = recipe;
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
             <button class="btn--tiny btn--increase-servings">
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
          <svg>
             <use href="${icon}#icon-user"></use>
          </svg>
          </div>
          <button class="btn--round">
          <svg class="">
             <use href="${icon}#icon-bookmark-fill"></use>
          </svg>
          </button>
          </div>
       <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${ingredients.map(this.#createMarkupIngredient).join('')}
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
   // create markup ingredient
   #createMarkupIngredient(ingredient) {
      const { unit, quantity, description } = ingredient;
      return `
         <li class="recipe__ingredient">
            <svg class="recipe__icon">
            <use href="${icon}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${
               quantity ? new Fraction(quantity) : ''
            }</div>
            <div class="recipe__description">
            <span class="recipe__unit">${unit}</span>
            ${description}
            </div>
         </li>
      `;
   }
}

export default new RecipeView();
