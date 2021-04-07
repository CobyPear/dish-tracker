const API = {
    getRestaurantsByGeo: async(lat, lon, userPage) => {
        try {
            // add loading spinner
            const div = document.createElement('div')
            div.classList = 'd-flex flex-row justify-content-center py-3'
            const spinner = document.createElement('div')
            spinner.classList = 'spinner-border d-block-block'
            spinner.role = 'status'
            div.append(spinner)
            MAIN.prepend(div)

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
                // hide loading spinner
            if (restaurants, page, pageId, totalPages) spinner.classList.add('d-none')

            return { restaurants, page, pageId, totalPages }
        } catch (error) {
            throw new Error(error.message)
        }
    },
    getRestaurantsByZip: async(zip, userPage) => {
        try {
            // add loading spinner
            const div = document.createElement('div')
            div.classList = 'd-flex flex-row justify-content-center py-3'
            const spinner = document.createElement('div')
            spinner.classList = 'spinner-border d-block-block'
            spinner.role = 'status'
            div.append(spinner)
            MAIN.prepend(div)

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
            if (restaurants, page, pageId, totalPages) spinner.classList.add('d-none')

            return { restaurants, page, pageId, totalPages }
        } catch (error) {
            throw new Error(error)
        }
    },
    getMenu: async(restId, userPage) => {
        try {
            // add loading spinner
            const div = document.createElement('div')
            div.classList = 'd-flex flex-row justify-content-center py-3'
            const spinner = document.createElement('div')
            spinner.classList = 'spinner-border d-block-block'
            spinner.role = 'status'
            div.append(spinner)
            MAIN.prepend(div)

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
            if (menu, page, pageId, totalPages) spinner.classList.add('d-none')


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
                return { menu, page, pageId, totalPages }
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }
}