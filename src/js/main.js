import { searchRecipes } from './RecipeService.mjs';

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const recipeList = document.getElementById('recipeList');

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const query = searchInput.value.trim();
    console.log('Buscando:', query); // Para verificar que el botón responde
    if (!query) return;

    recipeList.innerHTML = '<p>Loading recipes...</p>';

    try {
        const recipes = await searchRecipes(query);
        console.log('Recetas recibidas:', recipes); // Para verificar qué devuelve la API
        renderRecipes(recipes);
    } catch (error) {
        console.error('Error en la búsqueda:', error);
        recipeList.innerHTML = '<p>Error loading recipes. Please try again.</p>';
    }
});

function renderRecipes(recipes) {
    recipeList.innerHTML = '';

    if (!recipes || recipes.length === 0) {
        recipeList.innerHTML = '<p>No recipes found. Try another search!</p>';
        return;
    }

    recipes.forEach((meal) => {
        const article = document.createElement('article');
        article.className = 'recipe-card';

        article.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <div class="recipe-card-content">
        <h3>${meal.strMeal}</h3>
        <p>Category: ${meal.strCategory || 'N/A'}</p>
        <p>Country: ${meal.strArea || 'N/A'}</p>
      </div>
    `;

        recipeList.appendChild(article);
    });
}