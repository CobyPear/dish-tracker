function showPageButtons(pages, currentPage, condition) {
    if (pages === 1) return
    const pageBtnContainer = document.createElement('div')
    pageBtnContainer.classList = 'container-fluid d-flex flex-row justify-content-center'

    for (let i = 1; i <= pages; i++) {

        const pageButton = document.createElement('button')
        pageButton.classList = 'btn btn-secondary mx-1'
        pageButton.id = i
        pageButton.innerHTML = i
        pageButton.addEventListener('click', (e) => {
            if (condition === 'restaurant') {
                userPage = e.target.id
                console.log('userPage: ', userPage)
                if (userFromLocalStorage.lat) {
                    console.log('userlat')
                    const lat = userFromLocalStorage.lat
                    const lon = userFromLocalStorage.lon

                    usRestaurantMenuURL = `https://api.documenu.com/v2/restaurants/search/geo?lat=${lat}&lon=${lon}&distance=1&page=${userPage}`
                    console.log(usRestaurantMenuURL)
                    showRestaurants()
                } else if (userFromLocalStorage.zip) {
                    const zip = userFromLocalStorage.zip

                    usRestaurantMenuURL = `https://api.documenu.com/v2/restaurants/zip_code/${zip}?page=${userPage}`

                    showRestaurants()
                } else {
                    showRestaurants()
                }

            } else if (condition === 'menu') {
                menuPage = e.target.id
                console.log('menuPage: ', menuPage)
                // TODO DO CHECKS HERE LIKE ABOVE
                menuURL = `https://api.documenu.com/v2/restaurant/${currentRestMenu}/menuitems?page=${menuPage}`
                showMenu()
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
