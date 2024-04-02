import { API_URL } from './config.js';
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
    // 1) getting data of the api
    const { data } = await getJson(`${API_URL}/${id}`);
    // 2) update state object
    state.recipe = data.recipe;
  } catch (err) {
    throw err;
    // console.error(err);
  }
}

// controll search view function
export async function controllSearchView(query) {
  try {
    // reset currPage of App state
    state.search.currPage = 1;
    // update search object
    state.search.query = query;
    const data = await getJson(`${API_URL}/?search=${query}`);
    // update search object
    state.search.result = data.data.recipes;
    // render pagination buttons
    const paginationMarkup = paginationView._generateMarkup();
    paginationView._render(paginationMarkup);
    // return result per page
    return searchView._getResultPage();
  } catch (err) {
    throw err;
  }
}
