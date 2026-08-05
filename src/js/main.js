import { searchRecipes } from './RecipeService.mjs';
import { fetchFoodNews } from './NewsService.mjs';

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const recipeList = document.getElementById('recipeList');
const newsList = document.getElementById('newsList');
async function loadNews() {
    if (!newsList) return;
    newsList.innerHTML = '<p>Loading latest food news...</p>';

    const news = await fetchFoodNews();
    renderNews(news);
}

function renderNews(articles) {
    newsList.innerHTML = '';

    if (!articles || articles.length === 0) {
        newsList.innerHTML = '<p>No news available at the moment.</p>';
        return;
    }

    articles.forEach(article => {
        const card = document.createElement('article');
        card.className = 'news-card';
        card.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="align-self: flex-start; text-decoration: none; padding: 8px 15px; background-color: #FF9800; color: white; border-radius: 4px;">Read More</a>
        `;
        newsList.appendChild(card);
    });
}


searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const query = searchInput.value.trim();
    if (!query) return;

    recipeList.innerHTML = '<p>Loading recipes...</p>';

    try {
        const recipes = await searchRecipes(query);
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
                <p><strong>Category:</strong> ${meal.strCategory || 'N/A'}</p>
                <p><strong>Country:</strong> ${meal.strArea || 'N/A'}</p>
                <a href="recipe.html?id=${meal.idMeal}" class="btn btn-primary" style="margin-top: 10px; text-decoration: none; display: inline-block;">View Recipe</a>
            </div>
        `;

        recipeList.appendChild(article);
    });
}

loadNews();