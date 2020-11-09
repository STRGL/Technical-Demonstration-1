import { appendElements, createRecipeListHTML } from './helpers';
import { getRecipes } from './apiCalls';

const recipeContainer = document.querySelector('.recipes');
const nextButton = document.querySelector('.pagination .next');
const previousButton = document.querySelector('.pagination .previous');

//* FUNCTION TO LOAD THE HOME PAGE RECIPES
function loadHomePageRecipes(recipes) {
  const elements = recipes.map(recipe => createRecipeListHTML(recipe));
  appendElements(recipeContainer, elements);
}

//* REMOVE RECIPES INSIDE OF CONTAINER
function clearRecipes() {
  recipeContainer.innerHTML = '';
}

async function generateRecipes(page, offset = undefined, limit = undefined) {
  const result = await getRecipes(offset, limit);
  loadHomePageRecipes(result);
  function addEventListeners() {
    const events = ['click', 'touchstart'];
    const recipes = Array.from(document.querySelectorAll('li.recipe__item'));
    events.forEach(event => {
      recipes.forEach(recipe => {
        recipe.addEventListener(event, () => {
          window.location.href = `/recipe.html?recipe-id=${
            recipe.attributes['data-id'].value
          }`;
        });
      });
    });
  }
  addEventListeners();
}
if (!window.location.href.match(/page=\d/)) {
  generateRecipes();
}

// TODO: HANDLE TOUCHSTART EVENT
//* HANDLE CLICK ON PREVIOUS PAGINATION BUTTON
nextButton.addEventListener('click', function(e) {
  clearRecipes();
  generateRecipes(
    undefined,
    undefined,
    e.target.attributes['data-offset'].value
  );
  this.setAttribute(
    'data-offset',
    Number(e.target.attributes['data-offset'].value) + 20
  );
  previousButton.setAttribute(
    'data-offset',
    Number(e.target.attributes['data-offset'].value) - 40
  );
  if (previousButton.disabled === true) {
    previousButton.removeAttribute('disabled');
    previousButton.removeAttribute('aria-disabled');
  }
});

// TODO: HANDLE TOUCHSTART EVENT
//* HANDLE CLICK ON NEXT PAGINATION BUTTON
previousButton.addEventListener('click', function(e) {
  clearRecipes();
  generateRecipes(
    undefined,
    undefined,
    e.target.attributes['data-offset'].value
  );
  this.setAttribute(
    'data-offset',
    Number(e.target.attributes['data-offset'].value) - 20
  );
  nextButton.setAttribute(
    'data-offset',
    Number(e.target.attributes['data-offset'].value) + 40
  );
  if (Number(this.attributes['data-offset'].value < 0)) {
    previousButton.setAttribute('disabled', '');
    previousButton.setAttribute('aria-disabled', '');
  }
});
