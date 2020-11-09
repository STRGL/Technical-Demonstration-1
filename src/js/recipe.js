import { createElement, appendElements, createBreadcrumb } from './helpers';
import { getRecipes } from './apiCalls';

const urlParams = new URLSearchParams(window.location.search);
const recipeID = Number(urlParams.get('recipe-id')) || 1;
const ingredientList = document.querySelector('.recipe-ingredients__list');
const instructionsList = document.querySelector('.instructions');
const recipeTitle = document.querySelector('.recipe-overview__title--medium');
const breadcrumbs = document.querySelector('.breadcrumbs ul');
const form = document.querySelector('#recipe__calculator');
let serves;

function loadRecipeDetails(recipe) {
  const { ingredients, name, instructions, servings } = recipe;
  const breadcrumb = createBreadcrumb(name);
  serves = Number(servings);
  breadcrumbs.append(breadcrumb);
  recipeTitle.textContent = name;
  const ingredientElements = ingredients.map(ingredient => {
    const li = createElement('li', 'ingredient');
    const amount = createElement(
      'p',
      'ingredient__amount',
      `${ingredient.quantity} ${ingredient.unit}${
        ingredient.quantity !== 1 ? 's' : ''
      }`
    );
    const iName = createElement('p', 'ingredient__name', ingredient.name);
    li.append(amount);
    li.append(iName);
    return li;
  });
  const instructionElements = Object.values(instructions).map(instruction => {
    const li = createElement('li', 'instruction-step');
    const p = createElement('p', undefined, instruction.text);
    li.append(p);
    return li;
  });
  appendElements(ingredientList, ingredientElements);
  appendElements(instructionsList, instructionElements);
}

async function getRecipeDetails(id) {
  const recipe = await getRecipes(1, id - 1);
  loadRecipeDetails(recipe[0]);
}

getRecipeDetails(recipeID);

form.addEventListener('submit', function(e) {
  e.preventDefault();
  //   const servingsReq = Number(document.querySelector('#serving-size').value);
});
