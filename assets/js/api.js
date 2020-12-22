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
                    console.log(pageInStorage)
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
            console.log('API HIT')
            const objToStorage = {
                restaurants: restaurants,
                page: page,
                pageId: pageId,
                totalPages: totalPages
            }

            // add data from API call to local storage, then return the data
            console.log('restaurant not found in storage, adding page')

            restaurantsFromLocalStorage.push(objToStorage)
            localStorage.setItem('restaurants', JSON.stringify(restaurantsFromLocalStorage))

            console.log('returning data from API call')
            return { restaurants, page, pageId, totalPages }
        } catch (error) {
            console.log(error)
        }
    },
    getRestaurantsByZip: async(zip, page) => {
        try {
            // grab id from all restaurants in local storage to check if it's already stored
            const idFromStorage = restaurantsFromLocalStorage.map(x => ({
                pageZip: x.pageId.split('_')[0],
                pageNum: x.pageId.split('_')[1],
                pageId: x.pageId
            }))
            console.log('id from storage: ', idFromStorage)

            // here we'll filter out all the pages that match the search params
            for (let i = 0; i < idFromStorage.length; i++) {
                // filter through restaurants in storage to find page that matches our request
                let pageInStorage = restaurantsFromLocalStorage.filter(x => x.pageId === idFromStorage[i].pageId && Number(x.page) === Number(page) && zip === idFromStorage[i].pageZip)

                // if the page is found, return it.
                if (pageInStorage.length) {
                    console.log('returning page in storage')
                    console.log(pageInStorage)
                    return pageInStorage[0]
                }
            }

            const url = new URL('https://intense-waters-99245.herokuapp.com/api/restaurants/zip')
            const params = {
                zip: zip,
                page: page
            }
            url.search = new URLSearchParams(params).toString()

            const response = await fetch(
                url, {
                    method: 'GET',
                },
            )

            const data = await response.json()
            console.log('API HIT')

            const objToStorage = {
                restaurants: data.restaurants,
                page: data.page,
                pageId: data.pageId,
                totalPages: data.totalPages
            }

            // add data from API call to local storage, then return the data
            console.log('restaurant not found in storage, adding page')

            restaurantsFromLocalStorage.push(objToStorage)
            localStorage.setItem('restaurants', JSON.stringify(restaurantsFromLocalStorage))

            console.log('returning data from API call')
            console.log(data)
            return data[0]
        } catch (error) {
            throw new Error(error)
        }
    },
    getMenu: async(restId, page) => {
        try {
            // grab id from all restaurants in local storage to check if it's already stored
            const idFromStorage = menusFromLocalStorage.map(x => ({
                restId: x.pageId.split('_')[0],
                pageNum: x.pageId.split('_')[1],
                pageId: x.pageId
            }))
            console.log('id from storage: ', idFromStorage)

            // here we'll filter out all the pages that match the search params
            for (let i = 0; i < idFromStorage.length; i++) {
                // filter through restaurants in storage to find page that matches our request
                let pageInStorage = menusFromLocalStorage.filter(x => x.pageId === idFromStorage[i].pageId && Number(x.page) === Number(page) && restId === idFromStorage[i].restId)

                // if the page is found, return it.
                if (pageInStorage.length) {
                    console.log('returning page in storage')
                    console.log(pageInStorage)
                    return pageInStorage[0]
                }
            }

            const url = new URL('https://intense-waters-99245.herokuapp.com/api/menu')
            const params = {
                restaurant_id: restId,
                page: page,
            }
            url.search = new URLSearchParams(params).toString()

            const response = await fetch(
                url, {
                    method: 'GET',
                },
            )

            const data = await response.json()

            const objToStorage = {
                menu: data.menu,
                page: data.page,
                pageId: data.pageId,
                totalPages: data.totalPages
            }

            console.log('menu not found in storage, adding page')

            menusFromLocalStorage.push(objToStorage)
            localStorage.setItem('menus', JSON.stringify(menusFromLocalStorage))

            console.log('returning data from API call')
            console.log(data)
            return data
        } catch (error) {
            throw new Error(error.stack)
        }
    }
}