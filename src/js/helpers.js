// * HELPER FUNCTION TO REMOVE TEDIOUS REPETITION OF CREATING ELEMENTS
export function createElement(element, className = '', text) {
  const e = document.createElement(element);
  if (className.length > 0) {
    e.classList.add(className);
  }
  if (text) {
    e.textContent = text;
  }
  return e;
}

// * HELPER FUNCTION TO LOOP THROUGH PROVIDED ARRAY AND APPEND THEM IN ORDER TO PARENT NODE
export function appendElements(parentNode, orderedElements) {
  orderedElements.forEach(element => {
    parentNode.append(element);
  });
}

// * CREATE A RECIPE CARD
export function createRecipeListHTML(recipe) {
  const fragment = document.createDocumentFragment();
  const li = createElement('li', 'recipe__item');
  li.setAttribute('data-id', recipe.id);
  const container = createElement('div', 'recipe__container');
  const number = createElement('span', 'recipe__number', `${recipe.id}.`);
  const title = createElement('h3', 'recipe__item--title', `${recipe.name}`);
  container.append(number);
  container.append(title);
  li.append(container);
  fragment.append(li);
  return fragment;
}

export function createBreadcrumb(name) {
  const li = createElement('li', 'breadcrumb');
  const a = createElement('a', undefined, name);
  li.append(a);
  return li;
}
