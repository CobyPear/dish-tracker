function showPages(page, totalPages, condition) {
    if (totalPages === 1) return
    const pageBtnContainer = document.createElement('div')
    pageBtnContainer.classList = 'container d-flex flex-row justify-content-center'

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button')
        pageButton.classList = 'btn btn-secondary mx-1'
        pageButton.id = i
        pageButton.innerHTML = i
        pageButton.addEventListener('click', async(e) => {
            try {
                if (condition === 'restaurant') {
                    userPage = e.target.id
                    console.log('userPage: ', userPage)
                    if (userFromLocalStorage.lat) {
                        const lat = userFromLocalStorage.lat
                        const lon = userFromLocalStorage.lon

                        let data = await API.getRestaurantsByGeo(lat, lon, userPage)
                        showRestaurants(data)

                    } else if (userFromLocalStorage.zip) {
                        const zip = userFromLocalStorage.zip
                        let data = await API.getRestaurantsByZip(zip, userPage)
                        showRestaurants(data)

                    } else {
                        const lat = userFromLocalStorage.lat ? userFromLocalStorage.lat : null
                        const lon = userFromLocalStorage.lon ? userFromLocalStorage.lon : null
                        const zip = userFromLocalStorage.zip ? userFromLocalStorage.zip : null
                        if (lat || lon) {
                            let data = await API.getRestaurantsByGeo(lat, lon, userPage)
                            showRestaurants(data)
                        }
                        if (zip) {

                            let data = await API.getRestaurantsByZip(zip, userPage)
                            showRestaurants(data)
                        }
                    }

                } else if (condition === 'menu') {
                    menuPage = e.target.id
                    console.log('menuPage: ', menuPage)

                    let data = await API.getMenu(currentRestMenu, menuPage)
                    showMenu(data)
                }
            } catch (error) {
                throw new Error(error.stack)
            }
        })

        if (condition === 'restaurant') {
            restaurantDiv.append(pageBtnContainer)
            pageBtnContainer.append(pageButton)
        } else if (condition === 'menu') {
            menuDiv.append(pageBtnContainer)
            pageBtnContainer.append(pageButton)
        }
    }
}