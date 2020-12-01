async function getRestaurants() {
    try {

        if (restaurantsFromLocalStorage.length > 0) {
            if (userPage === undefined) userPage = 1
            if (restaurantsFromLocalStorage.some(x => Number(x.page) === Number(userPage))) {

                console.log('page found in storage')
                console.log('current page: ', userPage)
                console.log(restaurantsFromLocalStorage[userPage - 1].page)
                    // userPage = restaurantsFromLocalStorage[userPage-1].page
                return restaurantsFromLocalStorage[userPage - 1]
            } else {
                console.log('api hit, inner else')
                return await callAPI(usRestaurantMenuURL)
            }
        } else {
            console.log('api hit, outer else')
            return await callAPI(usRestaurantMenuURL)
        }
    } catch (error) {
        throw new Error(error.stack)
    }
}

async function callAPI(url) {
    try {
        const response = await fetch(
            url, {
                'method': 'GET',
                'headers': {
                    'x-rapidapi-key': API_KEY,
                    'x-rapidapi-host': 'us-restaurant-menus.p.rapidapi.com'
                }
            })
        const {
            result: {
                data,
                page,
                pages,
            }
        } = await response.json()

        const objToStorage = {
            data: data,
            pages: pages,
            page: page
        }
        console.log(objToStorage)

        if (restaurantsFromLocalStorage.length < 1 || restaurantsFromLocalStorage.every(x => Number(x.page) !== Number(page))) {
            console.log('page not found in storage, adding page')
            restaurantsFromLocalStorage.push(objToStorage)
            localStorage.setItem('restaurants', JSON.stringify(restaurantsFromLocalStorage))
            return restaurantsFromLocalStorage[page - 1]
        } else {
            console.log('page not found, return api call')
            return { data, pages, page }
        }

    } catch (error) {
        throw new Error(error)
    }
}