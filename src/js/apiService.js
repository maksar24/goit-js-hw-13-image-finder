export const getAPI = async (query, page) => {
    const apiData = {
        authorization: '22033849-04a58a8d7b6d53f5d68e2165a',
        collection: 12,
    };
    
    const url =
        `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=${apiData.collection}&key=${apiData.authorization}`;
    
        
    const res = await fetch(url);
    return await res.json();
}
