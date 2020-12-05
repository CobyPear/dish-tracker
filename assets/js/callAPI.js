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
                return await callAPIRestaurants(usRestaurantMenuURL)
            }
        } else {
            console.log('api hit, outer else')
            return await callAPIRestaurants(usRestaurantMenuURL)
        }
    } catch (error) {
        throw new Error(error.stack)
    }
}

async function getMenu() {
    try {
        if (menusFromLocalStorage.length > 0) {
            // if (menuPage === undefined) menuPage = 1
            if (currentRestMenu === undefined) return
            console.log(currentRestMenu)
            if (menusFromLocalStorage.some(x => Number(x.restaurant) === Number(currentRestMenu) && Number(menuPage) === Number(x.page))) {
                console.log('page found in storage')
                console.log('current page: ', menuPage)
                let foundMenu = menusFromLocalStorage.find(x => Number(x.restaurant) === Number(currentRestMenu) && Number(menuPage) === Number(x.page))
                return foundMenu
            } else {
                console.log('api hit, inner else')
                console.log(menuURL)
                let data = await callAPIMenu(menuURL)
                console.log(data)
                return data
            }
        } else {
            console.log('api hit, outer else')
            console.log(menuURL)
            let data = await callAPIMenu(menuURL)
            return data
        }
    } catch (error) {
        throw new Error(error.stack)
    }
}

async function callAPIRestaurants(url) {
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

async function callAPIMenu(url) {
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
            page: page,
            restaurant: data[0].restaurant_id
        }
        console.log(objToStorage)
        if (menusFromLocalStorage.length < 1 || menusFromLocalStorage.some(x => Number(x.restaurant) !== Number(currentRestMenu) || Number(x.page) !== Number(menuPage))) {
            console.log('page not found in storage, adding page')
            menusFromLocalStorage.push(objToStorage)
            localStorage.setItem('menus', JSON.stringify(menusFromLocalStorage))
            let foundMenu = menusFromLocalStorage.find(x => Number(x.restaurant) === Number(currentRestMenu) && Number(menuPage) === Number(x.page))
            return foundMenu
        } else {
            console.log('page not found, return api call')
            return { data, pages, page }
        }

    } catch (error) {
        throw new Error(error)
    }
}