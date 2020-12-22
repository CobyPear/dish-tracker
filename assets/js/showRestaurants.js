async function showRestaurants(data) {
    try {
        if (!data) return

        // set promise resolution to a variable
        const restaurantsData = await data
        // here we can destructure our object to get the info we need
        let { restaurants, page, totalPages } = await restaurantsData
        console.log(restaurantsData)
        // create a unordered list element
        const restaurantList = document.createElement('ul')
        // clear the list of previous results
        restaurantList.innerHTML = ''
        restaurantDiv.innerHTML = ''

        restaurants.forEach((restaurant, i) => {
            const restEl = document.createElement('li')
            const restBtn = document.createElement('button')
            restBtn.setAttribute('data-toggle', 'modal')
            restBtn.setAttribute('data-target', '#modal' + i + 'rest')
            restBtn.classList = 'btn btn-primary btn-block my-3 py-4'
            restBtn.innerText = restaurant.restaurant_name
            restBtn.id = restaurant.restaurant_id.toString()
            restBtn.addEventListener('click', e => {
                renderModal(restaurant, i, 'rest')
                currentRestMenu = e.target.id
                menuPage = 1
            })
            restEl.append(restBtn)
            restaurantList.append(restEl)
        })

        showPages(page, totalPages, 'restaurant')

        const backToTop = document.createElement('button')
        backToTop.addEventListener('click', (e) => {
            e.preventDefault()
            window.scrollTo(0, 0)
        })
        backToTop.classList = 'btn btn-warning py-3'
        backToTop.innerText = 'back to top'
        restaurantDiv.append(restaurantList, backToTop)


    } catch (error) {
        throw new Error(error)
    }
}