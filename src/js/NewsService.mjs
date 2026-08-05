const API_KEY = '6f4c067504544f35a7f7c8d5a9f3ea4a';

export async function fetchFoodNews(query = 'food') {
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`NewsAPI error: ${response.status}`);
        }

        const data = await response.json();

        return (data.articles || []).slice(0, 3).map(article => ({
            title: article.title,
            description: article.description || 'Click read more to view full article details.',
            url: article.url
        }));
    } catch (error) {
        console.warn('NewsAPI falló o fue bloqueado en producción. Activando contenido de respaldo:', error);

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