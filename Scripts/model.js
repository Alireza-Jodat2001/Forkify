import { apiURL } from './config.js';
import { getJson } from './helpers.js';

// App state
export const state = {
   recipe: {},
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
      console.log(err.message);
   }
}
