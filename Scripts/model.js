import { apiURL, resultPerPage } from './config.js';
import { getJson } from './helpers.js';
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import icon from 'url:../Images/icons.svg';

// App state
export const state = {
  recipe: {},
  bookmarks: [],
  search: {
    query: '',
    result: [],
    currPage: 1,
  },
};

// show recipes function
export async function sendRequest(id) {
  try {
    // getting data of the api
    const data = await getJson(`${apiURL}/${id}`);
    let { recipe } = data.data;
    // update state object
    state.recipe = {
      title: recipe.title,
      sourceUrl: recipe.source_url,
      servings: recipe.servings,
      publisher: recipe.publisher,
      ingredients: recipe.ingredients,
      image: recipe.image_url,
      id: recipe.id,
      cookingTime: recipe.cooking_time,
    };
  } catch (err) {
    //  throw err;
    console.error(err);
  }
}

// controll search view function
export async function controllSearchView(query) {
  try {
    // reset currPage of App state
    state.search.currPage = 1;
    // update search object
    state.search.query = query;
    const data = await getJson(`${apiURL}/?search=${query}`);
    // update search object
    state.search.result = data.data.recipes;
    // render pagination buttons
    paginationView._render();
    // return result per page
    return searchView._getResultPage();
  } catch (err) {
    throw err;
  }
}

// click event listener for bookmark button
document.querySelector('.recipe').addEventListener('click', e => {
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

  // 5) clear bookmark container
  document.querySelector('.bookmarks__list').innerHTML = '';

  // 6) create markups
  const markups = [...setBookmarks].map(bookmark => {
    return `
      <li class="preview">
        <a class="preview__link" href="#${bookmark.id}">
          <figure class="preview__fig">
            <img src="${bookmark.image}" alt="${bookmark.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__name">
              ${bookmark.title}
            </h4>
            <p class="preview__publisher">
              ${bookmark.publisher}
            </p>
          </div>
        </a>
      </li>
    `;
  });

  // 7) add markups
  document.querySelector('.bookmarks__list').innerHTML = markups.join('');
});
