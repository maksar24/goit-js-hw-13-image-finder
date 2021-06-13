export const getAPI = async (query, page) => {
    const apiData = new URLSearchParams({
        image_type: 'photo&orientation=horizontal',
        q: query,
        page: page,
        per_page: 12,
        key: '22033849-04a58a8d7b6d53f5d68e2165a',
    });
    
    const url = `https://pixabay.com/api/?${apiData}`
    const res = await fetch(url);
    return await res.json();
}
