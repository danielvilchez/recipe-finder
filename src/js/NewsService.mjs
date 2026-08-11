export async function fetchFoodNews() {
    // API pública y libre de restricciones de dominio (CORS/426)
    const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        // Mapea las categorías a un formato compatible con tus tarjetas de noticias
        return (data.categories || []).slice(0, 3).map(category => ({
            title: `Culinary Spotlight: ${category.strCategory}`,
            description: category.strCategoryDescription
                ? category.strCategoryDescription.slice(0, 120) + '...'
                : 'Explore world-class recipes and culinary techniques in this featured category.',
            url: `https://www.google.com/search?q=${encodeURIComponent(category.strCategory + ' recipes')}`
        }));
    } catch (error) {
        console.warn('Error fetching news/categories. Activating fallback:', error);

        return [
            {
                title: "Top Culinary Trends to Watch",
                description: "Discover the latest ingredient trends, sustainable cooking practices, and popular global flavors.",
                url: "https://www.bbcgoodfood.com"
            },
            {
                title: "Healthy & Quick Dinner Ideas",
                description: "Easy recipes that take under 30 minutes to prepare without sacrificing flavor or nutrition.",
                url: "https://www.allrecipes.com"
            }
        ];
    }
}