import { apiURL, resultPerPage } from './config.js';
import { getJson } from './helpers.js';
import paginationView from './views/paginationView.js';
import searchView from './views/searchView.js';
import icon from 'url:../Images/icons.svg';

// App state
export const state = {
  recipe: {},
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
