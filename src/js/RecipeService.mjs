const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';

export async function searchRecipes(query) {
    try {
        const response = await fetch(`${BASE_URL}search.php?s=${query}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data.meals || [];
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return [];
    }
}

export async function getRecipeById(id) {
    try {
        const response = await fetch(`${BASE_URL}lookup.php?i=${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data.meals ? data.meals[0] : null;
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        return null;
    }
}