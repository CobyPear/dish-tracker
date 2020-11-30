async function callAPI() {
    try {
        const response = await fetch(
            url, {
                'method': 'GET',
                'headers': {
                    'x-rapidapi-key': API_KEY,
                    'x-rapidapi-host': 'us-restaurant-menus.p.rapidapi.com'
                }
            })
        const data = await response.json()
        console.log(data)
    } catch (error) {
        throw new Error(error.message)
    }
    
    return data
}