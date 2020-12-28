const API = {
    getRestaurantsByGeo: async(lat, lon, userPage) => {
        try {
            // grab id from all restaurants in local storage to check if it's already stored
            const idFromStorage = restaurantsFromLocalStorage.map(x => ({
                pageLat: x.pageId.split('_')[0],
                pageLon: x.pageId.split('_')[1],
                pageNum: x.pageId.split('_')[2],
                pageId: x.pageId
            }))

            // here we'll filter out all the pages that match the search params
            for (let i = 0; i < idFromStorage.length; i++) {
                // filter through restaurants in storage to find page that matches our request
                let pageInStorage = restaurantsFromLocalStorage.filter(x => x.pageId === idFromStorage[i].pageId && Number(x.page) === Number(userPage))

                // if the page is found, return it.
                if (pageInStorage.length) {
                    console.log('returning page in storage')
                    return pageInStorage[0]
                }
            }

            const url = new URL('https://intense-waters-99245.herokuapp.com/api/restaurants/geo')
            const params = {
                lat: lat,
                lon: lon,
                page: userPage
            }
            url.search = new URLSearchParams(params).toString()

            const response = await fetch(
                url, {
                    method: 'GET',
                },
            )
            const { restaurants, page, pageId, totalPages } = await response.json()

            const objToStorage = {
                restaurants: restaurants,
                page: page,
                pageId: pageId,
                totalPages: totalPages
            }

            // add data from API call to local storage, then return the data
            restaurantsFromLocalStorage.push(objToStorage)
            localStorage.setItem('restaurants', JSON.stringify(restaurantsFromLocalStorage))

            return { restaurants, page, pageId, totalPages }
        } catch (error) {
            throw new Error(error.message)
        }
    },
    getRestaurantsByZip: async(zip, userPage) => {
        try {
            // grab id from all restaurants in local storage to check if it's already stored
            const idFromStorage = restaurantsFromLocalStorage.map(x => ({
                pageZip: x.pageId.split('_')[0],
                pageNum: x.pageId.split('_')[1],
                pageId: x.pageId
            }))

            // here we'll filter out all the pages that match the search params
            for (let i = 0; i < idFromStorage.length; i++) {
                // filter through restaurants in storage to find page that matches our request
                let pageInStorage = restaurantsFromLocalStorage.filter(x => x.pageId === idFromStorage[i].pageId && Number(x.page) === Number(userPage) && zip === idFromStorage[i].pageZip)

                // if the page is found, return it.
                if (pageInStorage.length) {
                    return pageInStorage[0]
                }
            }

            const url = new URL('https://intense-waters-99245.herokuapp.com/api/restaurants/zip')
            const params = {
                zip: zip,
                page: userPage
            }
            url.search = new URLSearchParams(params).toString()

            const response = await fetch(
                url, {
                    method: 'GET',
                },
            )

            const { restaurants, page, pageId, totalPages } = await response.json()

            const objToStorage = {
                restaurants: restaurants,
                page: page,
                pageId: pageId,
                totalPages: totalPages
            }

            // add data from API call to local storage, then return the data
            restaurantsFromLocalStorage.push(objToStorage)
            localStorage.setItem('restaurants', JSON.stringify(restaurantsFromLocalStorage))
            // return data from api call
            return { restaurants, page, pageId, totalPages }
        } catch (error) {
            throw new Error(error)
        }
    },
    getMenu: async(restId, userPage) => {
        try {
            // grab id from all restaurants in local storage to check if it's already stored
            const idFromStorage = menusFromLocalStorage.map(x => ({
                restId: x.pageId.split('_')[0],
                pageNum: x.pageId.split('_')[1],
                pageId: x.pageId
            }))
            // here we'll filter out all the pages that match the search params
            for (let i = 0; i < idFromStorage.length; i++) {
                // filter through restaurants in storage to find page that matches our request
                let pageInStorage = menusFromLocalStorage.filter(x => x.pageId === idFromStorage[i].pageId && Number(x.page) === Number(userPage) && restId === idFromStorage[i].restId)

                // if the page is found, return it.
                if (pageInStorage.length) {
                    return pageInStorage[0]
                }
            }
            // if we dont find the page in storage, hit the api then add the page
            const url = new URL('https://intense-waters-99245.herokuapp.com/api/menu')
            const params = {
                restaurant_id: restId,
                page: userPage,
            }
            url.search = new URLSearchParams(params).toString()

            const response = await fetch(
                url, {
                    method: 'GET',
                },
            )
            // await data from api call
            const { menu, page, pageId, totalPages } = await response.json()
            // store that data in local storage
            const objToStorage = {
                menu: menu,
                page: page,
                pageId: pageId,
                totalPages: totalPages
            }

            menusFromLocalStorage.push(objToStorage)
            localStorage.setItem('menus', JSON.stringify(menusFromLocalStorage))
            // return data from api call
            return { menu, page, pageId, totalPages }
        } catch (error) {
            throw new Error(error.message)
        }
    }
}