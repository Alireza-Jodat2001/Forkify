import { apiURL } from './config.js';
import { getJson } from './helpers.js';
import searchView from './views/searchView.js';

// App state
export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
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
    // update search object
    state.search.query = query;
    const data = await getJson(`${apiURL}/?search=${query}`);
    // update search object
    state.search.result = data.data.recipes;
    return data;
  } catch (err) {
    throw err;
  }
}

// class View {
//   #errorMessage;
//   #parent;
//   #data;

//   constructor(errorMessage, parent) {
//     this.#errorMessage = errorMessage;
//     this.#parent = parent;
//   }
//   // render result
//   _render(data) {
//     // this.#data = data;
//     //  console.log(this.#data);
//     // const recipeStrEl = this.#createMarkap(this.#data);
//     // clearContainer(this.#parentEl);
//     // insertHTML(this.#parentEl, recipeStrEl);
//   }
//   get _get() {
//     console.log(this.#errorMessage);
//     return this;
//   }
//   _getP() {
//     console.log(this.#parent);
//   }
//   _c(data) {
//     this.#data = data;
//     return this;
//   }
//   _getD() {
//     return this.#data;
//   }
// }

// class Two extends View {
//   #errorMessage;
//   constructor(errorMessage, parent) {
//     super(errorMessage, parent);
//   }
// }

// console.log(new Two('sasd', 'asd', 'ss')._c('asda'));
