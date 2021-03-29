const API = {
    getRestaurantsByGeo: async(lat, lon, userPage) => {
        try {
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

    
            return { restaurants, page, pageId, totalPages }
        } catch (error) {
            throw new Error(error.message)
        }
    },
    getRestaurantsByZip: async(zip, userPage) => {
        try {
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

            return { restaurants, page, pageId, totalPages }
        } catch (error) {
            throw new Error(error)
        }
    },
    getMenu: async(restId, userPage) => {
        try {
            
            // hit the api then add the page
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
            let { menu, page, pageId, totalPages } = await response.json()
            console.log('api hit menu',menu)
           
            // return data from api call
            if (menu.length > 0) {
                return { menu, page, pageId, totalPages }
            } else {
                menu = [{
                     menu_item_name: 'Sorry, no menu available at the moment. Try again later',
                     menu_item_price: '',
                     menu_item_description: '',
                     price_range: '',
                     restaurant_name: 'Error'
            }]
                console.log(menu, page, pageId, totalPages)
                return { menu, page, pageId, totalPages}
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }
}
