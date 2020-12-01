function showPageButtons(pages, currentPage) {
    const pageBtnContainer = document.createElement('div')
    pageBtnContainer.classList = 'container-fluid d-flex flex-row justify-content-center'    
 
    for (let i = 1; i <= pages; i++) {

        const pageButton = document.createElement('button')
        pageButton.classList = 'btn btn-secondary mx-1'
        pageButton.id = i
        pageButton.innerHTML = i
        pageButton.addEventListener('click', (e) => {
            userPage = e.target.id
            console.log('userPage: ', userPage)

            if (userLatLonFromLocalStorage.length > 0) {
                const lat = JSON.parse(userLatLonFromLocalStorage)[0]
                const lon = JSON.parse(userLatLonFromLocalStorage)[1]

                usRestaurantMenuURL = `https://us-restaurant-menus.p.rapidapi.com/restaurants/search/geo?lon=${lon}&lat=${lat}&distance=1&page=${userPage}`
                console.log(usRestaurantMenuURL)
                showRestaurants()
            } else if (userZipFromLocalStorage.length > 0) {
                const zip = userZipFromLocalStorage[0]

                usRestaurantMenuURL = `https://us-restaurant-menus.p.rapidapi.com/restaurants/zip_code/${zip}?page=${userPage}`

                showRestaurants()
            } else {
                showRestaurants()
            }
        })

        pageBtnContainer.append(pageButton)
    }
    restaurantDiv.append(pageBtnContainer)
}