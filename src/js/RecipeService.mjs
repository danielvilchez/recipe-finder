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