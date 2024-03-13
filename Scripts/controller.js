if (module.hot) module.hot.accept();

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
   return new Promise(function (_, reject) {
      setTimeout(function () {
         reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
   });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// show recipes function
async function showRecipes() {
   const res = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
   );
   console.log(res);
   const data = await res.json();
   console.log(data);
}
showRecipes();
