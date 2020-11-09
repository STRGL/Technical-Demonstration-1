const endpoint = 'http://18.130.116.85';

//* FUNCTION CALL TO GET RECIPES
export async function getRecipes(limit = 20, offset = 0) {
  const formdata = new FormData();
  formdata.append('limit', limit);
  formdata.append('offset', offset);

  const requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  return new Promise((resolve, reject) => {
    fetch(`${endpoint}/recipes`, requestOptions)
      .then(response => response.json())
      .then(data => {
        const recipes = Object.values(data);
        const ids = Object.keys(data);
        recipes.forEach((r, index) => {
          r.id = ids[index];
        });
        resolve(recipes);
      })
      .catch(err => {
        reject(err);
      });
  });
}

//* FUNCTION CALL TO GET RAW RECIPE DATA
export function getRecipesRaw(limit = 20, offset = 0) {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', 'c8c71961e7248f05666a8215ab5ac445');

  const formdata = new FormData();
  formdata.append('limit', limit);
  formdata.append('offset', offset);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
    mode: 'no-cors',
  };

  return new Promise((resolve, reject) =>
    fetch(`${endpoint}/recipes/raw`, requestOptions)
      .then(response => response.json())
      .then(data => {
        const recipes = Object.values(data);
        resolve(recipes);
      })
      .catch(err => {
        reject(err);
      })
  );
}

//* FUNCTION CALL TO GET INGREDIENTS DATA
export function getRecipesIngredients(recipeIdArray) {
  const headers = new Headers();
  headers.append('Authorization', 'caa93012a843e464c66711e014ee06df');

  const formdata = new FormData();
  formdata.append(recipeIdArray);

  const requestOptions = {
    method: 'POST',
    headers,
    body: formdata,
    redirect: 'follow',
  };

  return new Promise((resolve, reject) =>
    fetch(`${endpoint}/ingredients/raw`, requestOptions)
      .then(response => response.json())
      .then(data => {
        const recipes = Object.values(data);
        resolve(recipes);
      })
      .catch(err => {
        reject(err);
      })
  );
}

//* FUNCTION CALL TO GET RAW INSTRUCTIONS DATA
export function getRecipesInstructions(recipeIdArray) {
  const headers = new Headers();
  headers.append('Authorization', 'caa93012a843e464c66711e014ee06df');

  const formdata = new FormData();
  formdata.append(recipeIdArray);

  const requestOptions = {
    method: 'POST',
    headers,
    body: formdata,
    redirect: 'follow',
  };

  return new Promise((resolve, reject) =>
    fetch(`${endpoint}/instructions/raw`, requestOptions)
      .then(response => response.json())
      .then(data => {
        const recipes = Object.values(data);
        resolve(recipes);
      })
      .catch(err => {
        reject(err);
      })
  );
}
