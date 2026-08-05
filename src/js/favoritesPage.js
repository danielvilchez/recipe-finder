import { getFavorites, removeFavorite } from './Favorites.mjs';

const favoritesList = document.getElementById('favoritesList');

function renderFavorites() {
    const favorites = getFavorites();
    favoritesList.innerHTML = '';

    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p>You have no saved favorite recipes yet.</p>';
        return;
    }

    favorites.forEach(recipe => {
        const card = document.createElement('article');
        card.className = 'favorite-card';

        card.innerHTML = `
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            <div class="favorite-card-content">
                <div>
                    <h3>${recipe.strMeal}</h3>
                    <p><strong>Category:</strong> ${recipe.strCategory || 'N/A'}</p>
                </div>
                <div class="favorite-card-actions">
                    <a href="recipe.html?id=${recipe.idMeal}" class="btn">View</a>
                    <button class="btn-danger remove-btn" data-id="${recipe.idMeal}">Remove</button>
                </div>
            </div>
        `;

        card.innerHTML = `
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            <div class="favorite-card-content">
             <div>
                <h3>${recipe.strMeal}</h3>
                <p><strong>Category:</strong> ${recipe.strCategory || 'N/A'}</p>
            </div>
            <div class="favorite-card-actions">
                <a href="recipe.html?id=${recipe.idMeal}" class="btn-primary-card">View</a>
                <button class="btn-danger remove-btn" data-id="${recipe.idMeal}">Remove</button>
            </div>
        </div>
        `;

        favoritesList.appendChild(card);
    });

    favoritesList.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            removeFavorite(id);
            renderFavorites();
        });
    });
}

renderFavorites();