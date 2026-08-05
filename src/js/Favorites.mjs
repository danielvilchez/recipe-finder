const FAVORITES_KEY = 'recipe_finder_favorites';

export function getFavorites() {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
}

export function saveFavorite(recipe) {
    const favorites = getFavorites();
    const exists = favorites.some(item => item.idMeal === recipe.idMeal);

    if (!exists) {
        favorites.push({
            idMeal: recipe.idMeal,
            strMeal: recipe.strMeal,
            strMealThumb: recipe.strMealThumb,
            strCategory: recipe.strCategory,
            strArea: recipe.strArea
        });
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        return true;
    }
    return false;
}

export function removeFavorite(idMeal) {
    let favorites = getFavorites();
    favorites = favorites.filter(item => item.idMeal !== idMeal);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorite(idMeal) {
    const favorites = getFavorites();
    return favorites.some(item => item.idMeal === idMeal);
}