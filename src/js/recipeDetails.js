import { getRecipeById } from './RecipeService.mjs';
import { saveFavorite, removeFavorite, isFavorite } from './Favorites.mjs';

const container = document.getElementById('recipe-details-container');

async function init() {
    console.log('Iniciando recipeDetails.js...');
    const param = new URLSearchParams(window.location.search);
    const recipeId = param.get('id');

    console.log('ID recibido:', recipeId);

    if (!recipeId) {
        container.innerHTML = '<p>No recipe selected.</p>';
        return;
    }

    try {
        const recipe = await getRecipeById(recipeId);
        console.log('Datos de la receta:', recipe);

        if (!recipe) {
            container.innerHTML = '<p>Recipe details could not be loaded.</p>';
            return;
        }

        renderRecipeDetails(recipe);
    } catch (error) {
        console.error('Error al cargar la receta:', error);
        container.innerHTML = '<p>Error loading recipe details.</p>';
    }
}

function renderRecipeDetails(recipe) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== '') {
            ingredients.push(`${measure ? measure.trim() : ''} ${ingredient.trim()}`);
        }
    }

    const currentlyFavorite = isFavorite(recipe.idMeal);

    container.innerHTML = `
        <article class="recipe-detail-card">
            <h2>${recipe.strMeal}</h2>
            
            <div class="recipe-detail-top">
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                <div class="recipe-detail-info">
                    <p><strong>Category:</strong> ${recipe.strCategory || 'N/A'}</p>
                    <p><strong>Country:</strong> ${recipe.strArea || 'N/A'}</p>
                    <button id="add-favorite-btn" class="${currentlyFavorite ? 'btn-danger' : 'btn-primary-card'}" style="margin-top: 10px; width: fit-content;">
                        ${currentlyFavorite ? '❤️ Saved in Favorites' : '🤍 Save to Favorites'}
                    </button>
                    ${recipe.strYoutube ? `
                        <a href="${recipe.strYoutube}" target="_blank" rel="noopener noreferrer" class="youtube-link" style="width: fit-content; margin-top: 5px;">Watch Tutorial 🎬</a>
                    ` : ''}
                </div>
            </div>

            <h3 style="border-bottom: 2px solid #222; padding-bottom: 5px; margin-top: 10px;">Ingredients</h3>
            <ul class="ingredients-grid">
                ${ingredients.map(ing => `<li>✔ ${ing}</li>`).join('')}
            </ul>

            <h3 style="border-bottom: 2px solid #222; padding-bottom: 5px;">Instructions</h3>
            <div class="instructions-box">${recipe.strInstructions}</div>
        </article>
    `;

    const favBtn = document.getElementById('add-favorite-btn');
    favBtn.addEventListener('click', () => {
        if (isFavorite(recipe.idMeal)) {
            removeFavorite(recipe.idMeal);
            favBtn.textContent = '🤍 Save to Favorites';
            favBtn.className = 'btn-primary-card';
        } else {
            saveFavorite(recipe);
            favBtn.textContent = '❤️ Saved in Favorites';
            favBtn.className = 'btn-danger';
        }
    });
}

init();